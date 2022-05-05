import validator from 'validator';
import chalk from 'chalk';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers'; //hideBin is a shorthand for process.argv.slice(2)
import notes from './notes.js';


/*
//FileSystem module
import fs from 'fs';

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
*/

//console.log(validator.isEmail('eshomali@gmail.com'));
//console.log(chalk.blue('hello mate'));
//console.log(process.argv);


// add command
yargs(hideBin(process.argv)).command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,     //forces Title option to be required (ex: --title="")
            type: 'string'          //ensures that Title option is a string
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body) 
    }
}).parse();

// remove command
yargs(hideBin(process.argv)).command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
}).parse();

// list command
yargs(hideBin(process.argv)).command({
    command: 'list',
    describe: 'list all notes',
    handler() {
        notes.listNotes();
    }
}).parse();

// read command
yargs(hideBin(process.argv)).command({
    command: 'read',
    describe: 'read note',
    handler() {
        console.log('reading note..');
    }
}).parse();

//console.log(yargs(process.argv).argv);






