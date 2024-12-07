import mysql from 'mysql2' //mysql2 is latst version

import dotenv from 'dotenv'//for gloablly using databas we use .env file to export to servr cloud  
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE

}).promise();

//!create table
export async function createTable(table) {
    const createTodosTable = `
    CREATE TABLE IF NOT EXISTS ${table}(
        period INT ,
        day VARCHAR(255) NOT NULL,
        section VARCHAR(255) NOT NULL
    )
`;

    const [result] = await pool.query(createTodosTable);
    //return result
}


//!get all details
export async function getAllnotes(table) {
    const [rows] = await pool.query(`select * from ${table}`)
    return rows
}

// const notes = await getAllnotes()
// console.log(notes)
//!get specific details
export async function getNote(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM employees
    WHERE id = ? 
    `, [id])
    return rows[0]
}//here id is not spciic it changes with user there in where condition we kpt ?
// const note = await getNote(1)
// console.log(note)
//!insert a row--post
//const data = '24CVRA2'


export async function createNote(period, day, sections, faculty) {
    const data = faculty;
    try {
        await createTable(data);

        let insertQueries = [];
        const sections = ['CSE_A', 'CSE_B', 'CSE_C', 'CSE_D', 'CSE_E', 'CSE_F', 'CSE_G']
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        for (let section of sections) {
            for (let day of days) {
                insertQueries.push(`
                    SELECT period, '${day}' as day, '${section}' as section
                    FROM ${section}
                    WHERE ${day} IN (?)
                `);
            }
        }

        const insertQuery = `
            INSERT INTO ${data} (period, day, section)
            ${insertQueries.join(' UNION ALL ')}
        `;

        const [result] = await pool.query(insertQuery, Array(sections.length * days.length).fill(data));
        return await getAllnotes(data);
    } catch (err) {
        console.error(`Error creating note for ${data}:`, err);
        throw err;
    }
}
export async function truncateTable(faculty) {
    const data = faculty;
    const truncateTableQuery = `TRUNCATE TABLE ${data}`;
    await pool.query(truncateTableQuery);
}

// const result = await createNote(9, 'reddy', 'rr', 89);
// console.log(result);