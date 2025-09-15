import express from "express"
import bodyParser from "body-parser";

const app = express();

var titles = []
var articles = []

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req, res)=>{
    res.render("index.ejs", {
        headings: titles,
        paras: articles,
    })

})

app.get("/delete/:index", (req,res)=>{
    const id = req.params.index
    titles.splice(id, 1);
    articles.splice(id, 1);
    res.redirect("/")
})

app.get("/post", (req, res)=>{
    res.render("post.ejs")
})

app.post("/submit", (req, res)=>{
    titles.push(req.body["title"])
    articles.push(req.body["content"])
    res.redirect("/")
})

app.listen(3000, ()=>{
    console.log("Server running on port 3000")
})