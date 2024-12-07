import express from 'express';
import cors from "cors";
const app = express()
app.use(express.json())
app.use(cors())

import { getAllnotes, getNote, createNote, createTable, truncateTable } from './index.js';

//!set the view engine to ejs
// app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// !index page
// app.get('/', function (req, res) {
//     res.render('pages/index');
// });

//!get all employees
/*app.get("/employees", async (req, res) => {
    const notes = await getAllnotes();
    res.send(notes)
})

//!get specific employee
app.get("/employees/:id", async (req, res) => {
    const id = req.params.id
    const note = await getNote(id);
    res.send(note)
})*/
//!insert the value
app.post("/employees", async (req, res) => {
    const { period, day, section, faculty } = req.body;
    const note = await createNote(period, day, section, faculty);
    res.send(note)
    const note1 = await truncateTable(faculty);
})


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(3000, () => {
    console.log("server is running in http://localhost:3000");
})