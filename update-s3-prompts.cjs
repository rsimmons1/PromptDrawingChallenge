var AWS = require('aws-sdk');
const fs = require('fs');

// Connect to S3.
const REGION = "us-east-1";
AWS.config.region = REGION;
var cognito_credentials = "us-east-1:ea714e9e-b1be-41bf-aa56-e06de7b1b7e8";
var creds = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: cognito_credentials
});

const promptPathFileName = "2022_prompt_paths.json";

AWS.config.credentials = creds
var s3 = new AWS.S3({ region: REGION, credentials: creds });
// Set the AWS Region.

var params = {
    Bucket: '2022-prompt-drawings',
    Prefix: '2022/'
};

let promptFilePaths = [];

// Creates a file named `2022_prompt_paths.json` containing the complete list of prompt paths.
s3.listObjectsV2(params, (err, data) => {
    console.log(err);
    if (data) {
        data.Contents.forEach(element => {
            promptFilePaths.push(element.Key);
        });
        console.log(promptFilePaths);

        var promptPathsObj = { "promptPaths": promptFilePaths };

        fs.writeFile("./" + promptPathFileName, JSON.stringify(promptPathsObj), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    }
});
