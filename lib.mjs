var s3Url = "https://2022-prompt-drawings.s3.amazonaws.com";

module.exports.createS3Url = function (fileName) {
    return s3Url + "/" + fileName;
};