const validator = require('validator');

//FileSystem module
const fs = require('fs');

//Create js file with function
fs.writeFileSync('notes.js', `
    const getNotes = function() {
        return console.log('Your notes...');
    };`);

//append exports to that file
fs.appendFileSync('notes.js', `

    module.exports = getNotes;
`);

//pass function from notes.js to this class
const getNotes = require('./notes');

//execute the function
//getNotes();

console.log(validator.isEmail('eshomali@gmail.com'));





