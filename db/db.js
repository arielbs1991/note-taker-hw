const util = require("util");
const fs = require("fs");


const notesData = "./db/db.json";

const readFileAsync = util.promisify(fs.readFile);
// const writeFileAsync = util.promisify(fs.writeFile);
const writeFileAsync = util.promisify(fs.writeFile);
const id = Date.now();

class DB {
    async writeNotes(notesArr, currentNotes) {
        try {
            const {title, text} = notesArr;
            const newNote = {title, text, id};
            const combineNotes = [newNote, ...currentNotes];
            await writeFileAsync(notesData, JSON.stringify(combineNotes))
        } catch (e) {
            console.log("something went wrong while writing notesData", e);
        }
    }
    async readNotes() {
        const notesRaw = await readFileAsync(notesData, "utf8");
        try{
        return notesRaw ? JSON.parse(notesRaw) : [];
        } catch (e) {
            console.log("something went wrong while reading notesData", e)
        }
    }
    // async deleteNote() {
        //remove from this file, and call within the api file.
        //something like the filterednotes function, followed by await writefileasync to rewrite updated notes array
    // }
}

module.exports = new DB();

// const testDB = new DB();
// testDB.writeNotes({
//     table: "todo this stuff blah blah",
//     text: "finish homework blah blah"
// });