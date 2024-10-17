const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8081;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "misnielit"
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO nielit_account (`stud_name`,`roll_no`,`email`,`password`) VALUES (?)";
    const values = [
        req.body.stud_name,
        req.body.roll_no,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.json("Error");
        }
        console.error('inserting data:', data);
        return res.json(data);
    })
})

app.listen(PORT, () => {
    console.log("listening");
})