// @ts-check
var lib = require('../lib.mjs');
var promptImagesNames = [];
const /** @type {HTMLImageElement|null} */displayImage = document.querySelector('#display-image');

lib.getPromptNames((data) => {
    promptImagesNames = data.Contents.map((/** @type {{ Key: any; }} */ x) => {
        return x.Key
    });

    promptImagesNames = promptImagesNames.filter((/** @type {string} */ x) => {
        return x.startsWith("2022");
    });
});

const imageTitle = document.getElementById("image-title");
const randomImageButton = document.getElementById("random-image-button");
if (randomImageButton !== null) {
    randomImageButton.onclick = () => {
        var imageName = promptImagesNames[Math.floor(Math.random() * promptImagesNames.length)];
        var imageUrl = lib.createS3Url(imageName);

        console.log(imageName);
        if (imageTitle) {
            imageTitle.textContent = lib.getPromptNameFromFilepath(imageName);
        }
        if (displayImage) {
            displayImage.src = imageUrl;
        }
    }
}



