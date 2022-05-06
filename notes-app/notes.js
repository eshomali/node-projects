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
    //const duplicateNotes = notes.filter((eachNote) => eachNote.title === title);    //filters out single note, filter takes into account EVERY note (inefficient)
    const duplicateNote = notes.find( (eachNote) => eachNote.title === title);        //find is better method for search since it stops (efficient)
    
    if (!duplicateNote) {       //if duplicateNote returns false, add new note                
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

const readNote = (title) => {
    const notes = loadNotes();
    const findNote = notes.find( (aNote) => aNote.title === title );                         //check if title exists
    if(findNote) {                                                                           //if title exists
        const filterInNote = notes.filter( (theNote) => theNote.title === title);            //filter in that single note
        filterInNote.forEach(aNote => console.log(`Title: ` + aNote.title, `Body: ` + aNote.body));
        
        //console.log(findNote.title);                                                      //find() also acts as filter, can directly print values
        //console.log(findNote.body);
    } else {
        console.log(chalk.red('No Title Found'));
    }
}

const notes = {             //to be exported
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};
export default notes;
