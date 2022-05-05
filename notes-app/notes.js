import fs from 'fs';
import chalk from 'chalk';

const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}

const getNotes = function() {
    return console.log('Your notes...');
}

const addNote = function(title, body) {
    const notes = loadNotes();
    
    const duplicateNotes = notes.filter(function(eachNote) {    //filters out single note
        return eachNote.title === title;                        //return true or false
    });
    
    if (duplicateNotes.length === 0) {                      // if no matching array
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(`${title} saved successfully`);
    } else {
        console.log('title exists');
    }
}

const saveNotes = function(notes) {      //save to json file
    const dataJSON = JSON.stringify(notes); //convert js object to json string
    fs.writeFileSync('notes.json', dataJSON);
}


const removeNote = function(title) {
    const notes = loadNotes();      // load notes as object

    const notesToKeep = notes.filter(function(eachNote) {     //filters in all notes to save back except for removed one
        return eachNote.title !== title;
    });

    if(notesToKeep.length < notes.length) {
        console.log(chalk.green('Note Removed'));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red('No Note Found'));
    }
}

const notes = {             //to be exported
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
};
export default notes;
