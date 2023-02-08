const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "reser"
})
con.connect(function(error){
    if (error) {
        throw error;
    } else {
        console.log('Connecté à la BDD')
    }
})
app.post('/register', (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    console.log("Bonjour")

    con.query("INSERT INTO utilisateur (Email_uti, Nom_uti, Prénom_uti , Mot_de_passe_uti) VALUES (?, ?, ? , ?)", [email, username,username, password], 
        (err, result) => {
            if(err){
                res.send(err);
            }else{
                res.send({result})
            }
        }
    )
})

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    con.query("SELECT * FROM utilisateur WHERE Nom_uti = ? AND Mot_de_passe = ?", [username, password], 
        (err, result) => {
            if(err){
                res.send(err);
            }else{
                if(result.length > 0){
                    res.send(result);
                }else{
                    res.send({message: "WRONG USERNAME OR PASSWORD!"})
                }
            }
        }
    )
})

app.listen(3001, () => {
    console.log("running backend server");
})