const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const fileUpload = require("express-fileupload");


const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "securityDB",
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Database connected!");
});

//Clents CRUD

//Create new user
app.post("/clients", (req, res) => {
    const exts = ["jpeg", "jpg", "png", "svg", "webp"];
    const table = req.files.photo.name.split(".");
    const ext = table[table.length - 1];
    console.log(ext);
    if (!exts.includes(ext)) {
        console.log("wrong file type");
        res.status(422);
    } else {
        const filename = Date.now() + "." + ext;
        const file = req.files.photo;
        let uploadPath = __dirname + "../../front-end/public/images/" + filename;
        file.mv(uploadPath, (err) => {
            if (err) {
                return res.send(Err);
            }
        });

        const email = req.body.email;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const adresse = req.body.adresse;
        const phone = req.body.phone;
        const age = req.body.age;
        const photo = filename;

        db.query(
            `INSERT INTO clients (firstName, lastName, adresse, phone, email, photo) VALUES (? , ?, ?, ?, ?, ?);`, [
                `${firstName}`,
                `${lastName}`,
                `${adresse}`,
                `${phone}`,
                `${email}`,
                `${photo}`,
            ],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send("Values Inserted");
                }
            }
        );
    }
});

//Get all clients
app.get("/clients", (req, res) => {
    db.query("SELECT * FROM clients", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//Get client by client id
app.get("/clients/:id", (req, res) => {
    const id = req.params.id;
    db.query(`SELECT * FROM clients where id=?`, [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    });
});

//Update client infos by client id
app.put("/clients/:id", (req, res) => {
    const id = req.params.id;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const adresse = req.body.adresse;
    db.query(
        `UPDATE clients SET email=?, firstName = ?, lastName = ?,phone=?, adresse = ? WHERE id = ?`, [`${email}`, `${firstName}`, `${lastName}`, `${phone}`, `${adresse}`, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});


//Delete client 
app.delete("/clients/:id", (req, res) => {
    const id = req.params.id;
    db.query(`DELETE FROM clients WHERE id = ?`, [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


// Orders controllers

//Create order
app.post("/orders/:id", (req, res) => {
    const clientId = req.params.id;
    const orderName = req.body.orderName;
    const date = req.body.date;

    db.query(
        `INSERT INTO orders (clientId, orderName, date) VALUES (?, ?, ?)`, [clientId, `${orderName}`, `${date}`],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

//Get all orders
app.get("/orders", (req, res) => {
    db.query("SELECT * FROM orders", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//Get orders by client id
app.get("/client-orders/:id", (req, res) => {
    const clientId = req.params.id;
    db.query(
        `SELECT * FROM orders WHERE clientId =?`, [clientId],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

//Get order by order id
app.get("/orders/:id", (req, res) => {
    const id = req.params.id;
    db.query(`SELECT * FROM orders where id=?`, [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//Update order by order id
app.put("/orders/:id", (req, res) => {
    const id = req.params.id;
    const orderName = req.body.orderName;
    db.query(
        `UPDATE orders SET orderName = ? WHERE id = ?`, [`${orderName}`, id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

//Delete order by order id
app.delete("/orders/:id", (req, res) => {
    const id = req.params.id;
    db.query(`DELETE FROM orders WHERE id = ?`, [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});