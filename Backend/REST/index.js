const express = require("express")
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override")
app.use(methodOverride("_method"));
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("working")
})
let posts = [
    {
        username: "apnacollege",
        content: "i love coding",
        id: uuidv4()
    },
    {
        username: "Pampi",
        content: "i love eating",
        id: uuidv4()
    },
    {
        username: "param",
        content: "i love sleeeping",
        id: uuidv4()
    },
]
app.listen(port, () => {
    console.log("8080");
})
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts })
})
app.get("/posts/new", (req, res) => {
    res.render("new.ejs")
})
app.post("/posts", (req, res) => {
    let { username, content } = req.body
    let id = uuidv4();
    posts.push({
        username, content, id
    })
    res.redirect("/posts");
})
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id == p.id);

    res.render("show.ejs", { post })
})
app.patch("/posts/:id", (req, res) => 
    { let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id == p.id);
    post.content = newContent; 
 res.redirect("/posts") })

 app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("edit.ejs", {post})
    
} )
