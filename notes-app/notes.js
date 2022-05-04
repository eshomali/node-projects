import fs from 'fs';

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
    
    const duplicateNotes = notes.filter(function(note){
        return note.title === title;
    });
    
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(`${title}` + ' saved successfully');
    } else {
        console.log('title exists');
    }
}

const saveNotes = function(notes) {      //save to json file
    const dataJSON = JSON.stringify(notes); //convert js object to json string
    fs.writeFileSync('notes.json', dataJSON);
}

const notes = {             //to be exported
    getNotes: getNotes,
    addNote: addNote
};
export default notes;
