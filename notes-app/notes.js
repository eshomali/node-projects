import fs from 'fs';
import chalk from 'chalk';

/*  Functions:
    parse()     - converts string to JS object
    stringify() - converts JS object to JSON string
    push()    - adds new values to the target properties in JS object
    filter()  - we can filter in data or filter out data as JS object based on boolean return value
    find()    - similar to filter but finds single target in JS object without scanning thru entire array
    forEach() - loops thru JS object
    debugger  - chrome://inspect
*/


/*  Reads raw JSON file, converts data to string,
    parses string data as JS object for manipulation */  
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
}

/*  Takes in final JS object, converts it to JSON string,
    writes entire string back to file       */  
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

/*  Utility
    Lists every note in the JSON file       */  
const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse('Your Notes'));
    notes.forEach(eachNote => console.log(chalk.blue(eachNote.title)));
}

/*  Utility
    Appends a new note to the JS object    */  
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

/*  Utility
    Removes a current note based on title    */ 
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

/*  Utility
    Reads a particular note based on title    */ 
const readNote = (title) => {
    const notes = loadNotes();
    const findNote = notes.find( (aNote) => aNote.title === title );                         //check if title exists
    //debugger
    if(findNote) {                                                                           //if title exists
        const filterInNote = notes.filter( (theNote) => theNote.title === title);            //filter in that single note
        filterInNote.forEach(aNote => console.log(`Title: ` + aNote.title, `Body: ` + aNote.body));
        
        //console.log(findNote.title);                                                      //find() also acts as filter, can directly print values
        //console.log(findNote.body);
    } else {
        console.log(chalk.red('No Title Found'));
    }
}

//Exports
const notes = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};
export default notes;
