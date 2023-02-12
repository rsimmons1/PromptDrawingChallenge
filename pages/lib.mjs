var AWS = require('aws-sdk');
var s3Url = "https://2022-prompt-drawings.s3.amazonaws.com";

// Connect to S3.
const REGION = "us-east-1";
AWS.config.region = REGION;
var cognito_credentials = "us-east-1:ea714e9e-b1be-41bf-aa56-e06de7b1b7e8";
var creds = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: cognito_credentials
});

// Matches the pattern 2022/<YYYY><MM><DD>_<prompt_name>.png
// An example:
// - 2022/20220817_wing.png -> Match! Groups = {name:"wing"}
const fileNameMatchingRegex = /^2022\/\d\d\d\d\d\d\d\d_(?<name>.*).png/gm;

AWS.config.credentials = creds
var s3 = new AWS.S3({ region: REGION, credentials: creds });
// Set the AWS Region.

var params = {
    Bucket: '2022-prompt-drawings',
};

/** Creates URL to filename in corresponding s3 bucket. */
module.exports.createS3Url = function (fileName) {
    return s3Url + "/" + fileName;
};

/** Retrieves prompt file names from s3 bucket. */
module.exports.getPromptNames = function (callback) {
    s3.listObjectsV2(params, (err, data) => {
        console.log(err);
        if (data) {
            callback(data);
        }
    });
}

/** Gets the title of  */
module.exports.getPromptNameFromFilepath = function (/** @type {string} */filepath) {
    fileNameMatchingRegex.lastIndex = 0;
    var match = fileNameMatchingRegex.exec(filepath);
    if (match !== null && match.length == 2) {
        return match[1].toLocaleLowerCase();
    } else {
        return '';
    }
}