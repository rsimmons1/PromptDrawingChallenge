
var lib = require('../lib.mjs');
var promptImagesNames = [];


const imageDropDown = document.querySelector('#image-name');
const displayImage = document.querySelector('#display-image');

lib.getPromptNames((data) => {
    console.log("testing new code");
    promptImagesNames = data.Contents.map((x) => {
        var option = document.createElement("option");
        option.text = x.Key;
        imageDropDown.add(option);
        return x.Key
    });

});

if (imageDropDown) {
    imageDropDown.onchange = function () {
        console.log(imageDropDown.value);
        var imageUrl = lib.createS3Url(imageDropDown.value);
        displayImage.src = imageUrl;
    }
}


