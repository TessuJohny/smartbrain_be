const express = require('express');
const cors = require('cors');

const port = 3000;
const database = {
    users : [],
    passwords : []
};

const app = express();

//middleware to convert req.body to json.
app.use(express.json());
//middleware to address the 'Access-Control-Allow-Origin' error.
app.use(cors());

app.post('/register', (req, res) => {
    const { name, emailId, pwd } = req.body;
    const id = database.users.length + 1;
    const count = 0;
    const joined = new Date();
    const user = {
        id : id,
        name : name,
        emailId : emailId,
        count : count,
        joined : joined
    };
    database.users.push(user);
    database.passwords.push(pwd);
    res.json(user);
})

app.post('/signIn', (req, res) => {
    const { emailId, pwd } = req.body;
    const { passwords } = database;
    let isFound = false;
    database.users.forEach((user, i) => {
        if (user.emailId === emailId &&  passwords[i] === pwd) {
            isFound = true;
            return res.json(user);
        }
    })
    if (!isFound) {
        res.status(404).json('failed');
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    console.log(id);
    database.users.forEach(user => {
        if (user.id === id) {
            user.count++;
            return res.json(user);
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

