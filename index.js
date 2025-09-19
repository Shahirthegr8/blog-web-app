import express from "express"
import bodyParser from "body-parser";

const app = express();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

var titles = []
var articles = []
var dates = []
var authors = []

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req, res)=>{
    res.render("index.ejs", {
        headings: titles,
        paras: articles,
        date: dates,
        author: authors
    })

})

app.get("/delete/:index", (req,res)=>{
    const id = req.params.index
    titles.splice(id, 1);
    articles.splice(id, 1);
    dates.splice(id, 1)
    authors.splice(id, 1)
    res.redirect("/")
})

app.get("/modify/:index", (req,res)=>{
    const id = req.params.index
    const send = {
        title: titles[id],
        text: articles[id],
        author: authors[id],
        index: id
    }
    res.render("modify.ejs", send)
})

app.get("/post", (req, res)=>{
    res.render("post.ejs")
})

app.post("/submit", (req, res)=>{
    titles.push(req.body["title"])
    articles.push(req.body["content"])
    authors.push(req.body["author"])
    const today = new Date();
    dates.push(months[today.getMonth()] + " " + today.getDate() + ", "+ today.getFullYear())

    res.redirect("/")
})

app.post("/change", (req,res)=>{
    titles.push(req.body["title"])
    articles.push(req.body["content"])
    authors.push(req.body["author"])

    const today = new Date();
    dates.push(months[today.getMonth()] + " " + today.getDate() + ", "+ today.getFullYear())

    titles.splice(req.body["id"], 1)
    articles.splice(req.body["id"], 1)
    dates.splice(req.body["id"], 1)
    authors.splice(req.body["id"], 1)

    res.redirect("/")
})

app.listen(3000, ()=>{
    console.log("Server running on port 3000")
})