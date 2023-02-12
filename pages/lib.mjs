
var s3Url = "https://2022-prompt-drawings.s3.amazonaws.com";

const INITIAL_IMAGE_URL = "https://2022-prompt-drawings.s3.amazonaws.com/2022/20220101_purge.png";
const INITIAL_IMAGE_NAME = "purge";
const PROMPT_PATH_JSON_URL = "https://2022-prompt-drawings.s3.amazonaws.com/2022_prompt_paths.json";

// Matches the pattern 2022/<YYYY><MM><DD>_<prompt_name>.png
// An example:
// - 2022/20220817_wing.png -> Match! Groups = {name:"wing"}
const fileNameMatchingRegex = /2022\/\d\d\d\d\d\d\d\d_(?<name>.*).png/gm;
// Set the AWS Region.

var params = {
    Bucket: '2022-prompt-drawings',
};

/** Creates URL to filename in corresponding s3 bucket. */
module.exports.createS3Url = function (fileName) {
    return s3Url + "/" + fileName;
};
/** Finds the full prompt path with the corresponding prompt name.
 * 
 * For Example:
 *  state -> 2022/20221014_state.png 
 */
module.exports.getPromptPathFromName = function (promptPaths, promptName) {
    for (let /** @type {string} */index in promptPaths) {
        let promptPath = promptPaths[index];
        let currentPromptName = module.exports.getPromptNameFromFilepath(promptPath);
        if (currentPromptName === promptName.toLocaleLowerCase()) {
            return promptPath;
        }
    }
    return "";
};

/** Gets the title of  */
module.exports.getPromptNameFromFilepath = function (/** @type {string} */filepath) {
    fileNameMatchingRegex.lastIndex = 0;
    var match = fileNameMatchingRegex.exec(filepath);
    if (match !== null && match.length == 2) {
        return match[1].toLocaleLowerCase();
    } else {
        return '';
    }
};

module.exports.loadPromptPathsFromFile = function (callback) {
    fetch(PROMPT_PATH_JSON_URL)
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        });
}

module.exports.INITIAL_IMAGE_NAME = INITIAL_IMAGE_NAME;
module.exports.INITIAL_IMAGE_URL = INITIAL_IMAGE_URL;