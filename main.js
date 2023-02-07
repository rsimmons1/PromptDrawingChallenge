var AWS = require('aws-sdk');
var lib = require('./lib.mjs');
var promptImagesNames = [];
const REGION = "us-east-1";
AWS.config.region = REGION;
var cognito_credentials = "us-east-1:ea714e9e-b1be-41bf-aa56-e06de7b1b7e8";
var creds = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: cognito_credentials
});
AWS.config.credentials = creds
var s3 = new AWS.S3({ region: REGION, credentials: creds });
// Set the AWS Region.

var params = {
    Bucket: '2022-prompt-drawings',
};

const imageDropDown = document.querySelector('#image-name');
const displayImage = document.querySelector('#display-image');

s3.listObjectsV2(params, (err, data) => {
    console.log(err);
    if (data) {
        promptImagesNames = data.Contents.map((x) => {
            var option = document.createElement("option");
            option.text = x.Key;
            imageDropDown.add(option);
            return x.Key
        });

    }
});

if (imageDropDown) {
    imageDropDown.onchange = function () {
        console.log(imageDropDown.value);
        var imageUrl = lib.createS3Url(imageDropDown.value);
        displayImage.src = imageUrl;
    }
}


