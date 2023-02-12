// @ts-check
var lib = require('../lib.mjs');
var promptImagesPaths = [];
var /** @type {string} */ initialPageHash = window.location.hash;
const /** @type {HTMLImageElement|null} */displayImage = document.querySelector('#display-image');
const imageTitle = document.getElementById("image-title");
const randomImageButton = document.getElementById("random-image-button");

if (displayImage && imageTitle) {
    if (initialPageHash === '') {
        console.log("Setting initial image");
        displayImage.src = lib.INITIAL_IMAGE_URL;
        imageTitle.textContent = lib.INITIAL_IMAGE_NAME;
    }
}



lib.loadPromptPathsFromFile((data) => {
    promptImagesPaths = data.promptPaths;

    if (initialPageHash !== '') {
        let hashPromptpath = lib.getPromptPathFromName(promptImagesPaths, initialPageHash.slice(1));
        let imageUrl = lib.createS3Url(hashPromptpath);
        updateImage(imageUrl);
    }
});

function updateImage(/** @type {string} */ imageUrl) {
    console.log(imageUrl);
    if (imageTitle) {
        imageTitle.textContent = lib.getPromptNameFromFilepath(imageUrl);
    }
    if (displayImage) {
        displayImage.src = imageUrl;
    }
}

if (randomImageButton !== null) {
    randomImageButton.onclick = () => {
        var imagePath = promptImagesPaths[Math.floor(Math.random() * promptImagesPaths.length)];
        var imageUrl = lib.createS3Url(imagePath);
        var promptName = lib.getPromptNameFromFilepath(imageUrl);
        window.location.hash = promptName;
        updateImage(imageUrl);

    }
}



