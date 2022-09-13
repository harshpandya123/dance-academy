require('dotenv').config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const contact=fs.readFileSync('./views/contact.pug')

const app = express();
const port = process.env.PORT || 3000;


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
// app.get('/', (req, res)=>{ 

//     res.status(200).render('base.pug');
// })
app.get('/Contact', (req, res)=>{ 

    res.status(200).render('contact.pug');
})
app.get('/', (req, res)=>{ 

    res.status(200).render('index.pug');
})

app.post('/Contact',(req,res)=>{
    // console.log(req.body)
    name=req.body.name
    phone=req.body.phone
    email=req.body.email
    address=req.body.address
    let outputToWrite=`name is${name}.phone no is ${phone}.email is ${email}.address is ${address}`
    fs.writeFileSync('output.txt',outputToWrite)
    const params = {'message': 'Your form has been submitted successfully'}
    res.status(200).render('contact.pug', params);
})

// START THE SERVER 
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
