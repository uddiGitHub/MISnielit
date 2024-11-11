const express = require("express");
const mysql = require('mysql');
const cors = require('cors');


const nodemailer = require('nodemailer');
require("dotenv").config();

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
    const checkSql = "SELECT * FROM nielit_account WHERE email = ? OR roll_no = ?";

    db.query(checkSql, [req.body.email, req.body.roll_no], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database query error");
        }
        if (results.length > 0) {
            return res.status(400).send("Email or Roll Number already exists");
        }
        const sql = "INSERT INTO nielit_account (`stud_name`, `roll_no`, `email`, `password`) VALUES (?, ?, ?, ?)";

        try {
            const salt = await bcrypt.genSalt(10);
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
                    return res.status(500).send("Error inserting data into database");
                }
                res.status(200).send("Signup successful!");
            });
        } catch (err) {
            console.error(err);
            res.status(500).send("Error during signup");
        }
    });
});


app.post('/login', (req, res) => {
    const sql = "SELECT * FROM nielit_account WHERE `email` = ?";

    db.query(sql, [req.body.email], async (err, data) => {
        if (err) {
            return res.status(500).json("Error");
        }

        if (data.length > 0) {
            const user = data[0];
            console.log(user.password)
            console.log(req.body.password)
            try {
                const match = await bcrypt.compare(req.body.password, user.password);
                console.log(match)
                if (match) {
                    console.log(match)
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

//email reset
function sendRestEmail({ recipient_email, OTP }) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD,
            },
        });

        const mail_configs = {
            from: process.env.MY_EMAIL,
            to: recipient_email,
            subject: "Student Account Password Recovery",
            html: `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                      <meta charset="UTF-8">
                      <title>OTP Email Template</title>
                      <style>
                        body {
                            font-family: Helvetica, Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background-color: #f6f6f6;
                            min-height: 100vh;
                        }
                        .container {
                            width: 100%;
                            max-width: 600px;
                            background: #ffffff;
                            border-radius: 8px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            padding: 20px;
                            text-align: center;
                            margin: 20px;
                        }
                        .header {
                            font-size: 1.4em;
                            color: #00466a;
                            font-weight: bold;
                            padding-bottom: 15px;
                            border-bottom: 1px solid #eee;
                        }
                        .otp {
                            background: #00466a;
                            color: #ffffff;
                            display: inline-block;
                            padding: 10px 20px;
                            font-size: 1.2em;
                            border-radius: 5px;
                            margin: 20px 0;
                            font-weight: bold;
                        }
                        .footer {
                            color: #aaa;
                            font-size: 0.9em;
                            line-height: 1.4;
                            padding-top: 20px;
                            border-top: 1px solid #eee;
                            text-align: center;
                        }
                        .footer p {
                            margin: 4px 0;
                        }
                        .footer-logo {
                            width: 80px;
                            height: auto;
                            margin-top: 10px;
                        }
                        
                        /* Responsive styling for mobile devices */
                        @media (max-width: 600px) {
                            .container {
                                padding: 10px;
                                margin: 10px;
                            }
                            .header {
                                font-size: 1.2em;
                            }
                            .otp {
                                padding: 8px 16px;
                                font-size: 1em;
                            }
                            .footer {
                                font-size: 0.8em;
                            }
                        }
                      </style>
                    </head>
                    <body>
                      <div class="container">
                          <div class="header">National Institute of Electronics & Information Technology (NIELIT)</div>
                          <p style="font-size: 1.1em; margin-top: 20px;">Hello,</p>
                          <p>To complete your password recovery procedure, please use the following OTP. It is valid for the next 5 minutes.</p>
                          <div class="otp">${OTP}</div>
                          <p style="font-size: 0.9em;">Regards,<br />National Institute of Electronics & Information Technology (NIELIT)</p>
                          
                          <div class="footer">
                              <p>National Institute of Electronics & Information Technology (NIELIT)</p>
                              <p>NIELIT Bhawan, Plot No. 3, PSP Pocket, Sector-8, Dwarka, New Delhi-110077</p>
                              <p>Phone: 011-44446777</p>
                              <p>Call Centre No.: 011-44446771 / 25308303</p>
                              <p>Email: contact@nielit.gov.in</p>
                          </div>
                      </div>
                    </body>
                    </html>`
        };
        

        transporter.sendMail(mail_configs, function (error, info) {
            if (error) {
                console.log(error);
                return reject({ message: `An error has occured` });
            }
            return resolve({ message: "Email sent successfully" });
        });
    });
}

app.post("/send_recovery_email", (req, res) => {
    sendRestEmail(req.body)
        .then((response) => res.send(response.message))
        .catch((error) => res.status(500).send(error.message));
});


app.listen(PORT, () => {
    console.log("listening");
})