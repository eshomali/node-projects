import fs from 'fs';
import chalk from 'chalk';

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse('Your Notes'));
    notes.forEach(eachNote => console.log(chalk.blue(eachNote.title)));
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((eachNote) => eachNote.title === title);    //filters out single note 
    if (duplicateNotes.length === 0) {                      // if no matching array
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green(`${title} saved successfully`));
    } else {
        console.log(chalk.red('title exists'));
    }
}

const saveNotes = (notes) => {      //save to json file
    const dataJSON = JSON.stringify(notes); //convert js object to json string
    fs.writeFileSync('notes.json', dataJSON);
}

const removeNote = (title) => {
    const notes = loadNotes();      // load notes as object
    const notesToKeep = notes.filter((eachNote) => eachNote.title !== title);  //filters in all notes to save back except for removed one
    if(notesToKeep.length < notes.length) {
        console.log(chalk.green('Note Removed'));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red('No Note Found'));
    }
}

const notes = {             //to be exported
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
};
export default notes;
