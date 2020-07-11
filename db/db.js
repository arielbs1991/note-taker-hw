const util = require("util");
const fs = require("fs");


const notesData = "./db/db.json";

const readFileAsync = util.promisify(fs.readFile);
// const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

// class DB {
//     async writeNotes(notesArray) {
//         try {
//             await appendFileAsync(notesData, JSON.stringify(notesArray))
//         } catch (e) {
//             console.log("something went wrong while writing notesData", e);
//         }
//     }
//     async readNotes() {
//         const notesRaw = await readFileAsync(notesData, "utf8");
//         try{
//         return notesRaw? JSON.parse(notesRaw) : [];
//         } catch (e) {
//             console.log("something went wrong while reading notesData", e)
//         }
//     }
// }

//Cody's help code
//not writing to the json file :/
class DB {
    async writeNotes(notesArr, currentNotes) {
        try {
            //we need to clear the db.json file before rewriting to it
            // notesData.empty();
            const {title, text} = notesArr;
            const newNote = {title, text};
            const combineNotes = [newNote, ...currentNotes];
            await appendFileAsync(notesData, JSON.stringify(combineNotes))
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
}

module.exports = new DB();

// const testDB = new DB();
// testDB.writeNotes({
//     table: "todo this stuff blah blah",
//     text: "finish homework blah blah"
// });