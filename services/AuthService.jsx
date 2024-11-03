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

const bcrypt = require('bcryptjs');

app.post('/signup', async (req, res) => {
    const sql = "INSERT INTO nielit_account (`stud_name`, `roll_no`, `email`, `password`) VALUES (?, ?, ?, ?)";
    
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const values = [
            req.body.stud_name,
            req.body.roll_no,
            req.body.email,
            hashedPassword 
        ];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error inserting data into database");
            } else {
                res.status(200).send("Signup successful!");
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error during signup");
    }
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM nielit_account WHERE `email` = ?";
    
    db.query(sql, [req.body.email], async (err, data) => {
        if (err) {
            return res.status(500).json("Error");
        }

        if (data.length > 0) {
            const user = data[0];
            console.log(user)
            try {
                const match = bcrypt.compare(req.body.password, user.password);
                console.log(match)
                if (match) {
                    return res.status(200).json("Success");
                } else {
                    return res.status(401).json("Failed: Invalid email or password");
                }
            } catch (compareErr) {
                return res.status(500).json("Error during password comparison");
            }
        } else {
            return res.status(401).json("Failed: Invalid email or password");
        }
    });
});



app.listen(PORT, () => {
    console.log("listening");
})