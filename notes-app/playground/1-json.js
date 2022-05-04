import fs from "fs";
import { json } from "stream/consumers";

const dataBuffer = fs.readFileSync('1-json.json');  //readFileSync returns random buffer data
const dataJSON = dataBuffer.toString();             //toString convert buffer data to string (JSON syntax)
const data = JSON.parse(dataJSON);                  //parse converts string to js object to access object values

//update js object based on key values
data.name = 'Essa';
data.planet = 'Mars';
data.age = '29';

fs.writeFileSync('1-json.json', JSON.stringify(data));    //stringify converts JSON object to JSON string. overwrite current file with JSON-syntax string



