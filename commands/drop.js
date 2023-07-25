const {
    Canvas,
    createCanvas,
    loadImage, GlobalFonts
} = require('@napi-rs/canvas')
const {
    AttachmentBuilder
} = require('discord.js');
const fs = require('fs');
const { join } = require('path');

// Function to select a random element from an array
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to get a list of image files in the "images" folder
function getImageFiles() {
    const imagesFolder = join(__dirname, '../cards');
    const imageFiles = fs.readdirSync(imagesFolder);
    return imageFiles.filter(file => {
        return fs.statSync(join(imagesFolder, file)).isFile();
    });
}

// Main function to select a random image file
function getRandomImageFile() {
    const imageFiles = getImageFiles();
    if (imageFiles.length === 0) {
        throw new Error('No image files found in the "images" folder.');
    }
    return getRandomElement(imageFiles);
}

exports.run = async (client, message, args) => {


    const image1 = await loadImage(join(__dirname, `../cards/${getRandomImageFile()}`));
    const image2 = await loadImage(join(__dirname, `../cards/${getRandomImageFile()}`));
    const image3 = await loadImage(join(__dirname, `../cards/${getRandomImageFile()}`));

    const canvas = await createCanvas(1008, 524);
    const context = canvas.getContext('2d');

    context.drawImage(image1, 0, 10, 130, 180);
    context.drawImage(image2, 135, 10, 130, 180);
    context.drawImage(image3, 270, 10, 130, 180);

    const pngFile = await canvas.encode('png');
      const attachment = new AttachmentBuilder(pngFile, 'modified_image.jpg');
      message.channel.send({
        content: '',
        files: [attachment]
      }).catch((e) => {
        console.error(e);
        return;
      })

}

exports.name = "drop"
exports.aliases = ['d']