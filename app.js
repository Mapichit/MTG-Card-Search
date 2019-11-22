var express = require("express");
var app = express();
var request = require("request");
var flash = require("connect-flash");

app.use(express.static(__dirname + '/public'));
app.use(flash());
app.set("view engine", "ejs");

app.use(require("express-session")({
    secret: "mtg",
    resave: false,
    saveUninitialized: false
}));

app.get("/", (req,res) => {
    res.render("landing", {message: req.flash("error")});
});
 
app.get("/results", (req,res) =>{
    let name =(req.query.name);
    let url="https://api.scryfall.com/cards/search?q=" + name;
    request(url, (error,response,body) =>{
        if(!error && response.statusCode == 200){
            var cards = JSON.parse(body);
            res.render("results", {cards: cards, cardName:name});
            
        } else{
            req.flash("error", "Error, Card Not Found");
            res.redirect("/");
        }
    }); 
    
});

app.listen(3000, () => console.log("Listening on port 3000"));