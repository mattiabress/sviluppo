//require
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require("body-parser");

//app.use methods
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;

//database
let prodotti = [{
    "ID":1,
    "name" : "patate",
    "prezzo" : 20
},{
    "ID":2,
    "name" : "pere",
    "prezzo" : 30
}]

//routes
app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname + '/add.html'));
});

app.get("/del", function(req, res) {
    res.sendFile(path.join(__dirname + '/delete.html'));
});

app.get("/mod", function(req, res) {
    res.sendFile(path.join(__dirname + '/mod.html'));
});

app.get("/main", function(req, res) {
    res.sendFile(path.join(__dirname + '/main.html'));
});

//non ha molto senso ma "ok"
app.get("/ok", function(req,res){
    res.sendStatus(200)
})

//popola l'array con altri 25 elementi nominati dalla A alla Z con costo casuale
app.get("/pop", function(req,res){
    for(let i = 0; i < 26; i++ ){
        let q = {
            "ID" : nprodotti + 1, //you can use prodotti.length instead of nprodotti
            "name" : String.fromCharCode(i + 65),
            "prezzo" : Math.floor(Math.random() * 51)
        }
        prodotti.push(q)
    }
    res.send("array populated")
})

//crea un prodotto con dei dati specifici
app.post("/create", function(req,res){
    
    const name = req.headers['name'] // req.body.name
    const prezzo = req.headers['prezzo'] // req.body.prezzo
    
    let prodotto = {
        "ID" : nprodotti + 1,
        "name" : name,
        "prezzo" : prezzo
    }

    prodotti.push(prodotto)
    res.send("element added")
})

//cancella un prodotto
app.delete('/:id', function(req, res){
    let id = req.params.id
    
    if(id < prodotti.length){
        prodotti.splice(id,1)
        res.send("element canceled")
    }else
        res.send("ID not found");
})

//restituisce tutto l'array
app.get('/', (req, res) => {
    res.send(prodotti)
})

//edit specifico prodotto
app.put('/edit/:id', (req, res) => {
   
    const id = req.params.id
    const nName = req.query.name // req.body.name
    const nPrezzo = req.query.prezzo  // req.body.prezzo

    
    //instead
    if(id>=prodotti.length)
        return res.send("ID not found")
    
    prodotti[id - 1] = {
            "ID" : parseInt(id),
            "name" : nName,
            "prezzo" : nPrezzo 
        }
    res.send("edited")
})


//used to open the server port
app.listen(port, function() {
    console.log("Listening on " + port);
});
