const express = require("express");
const mongoose = require("mongoose")
const Article = require("./models/Article");

mongoose
.connect("mongodb+srv://mohamedchaib964:dbPassword@cluster0.le6o8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
 
  serverSelectionTimeoutMS: 10000 // زيادة مهلة الاتصال
})
.then(()=>{
  console.log("connected susctefuly")
})
.catch((error)=>{
  console.log("connected unsusctefuly : "+error.message)

})


const cors =  require("cors");
const app = express();

mongoose.Collection

app.use(express.json());
app.use(cors({origin : true}));


app.post("/articles", async (req,res)=>{
   const newArticle = new Article();
   newArticle.title = req.body.title;
   newArticle.body = req.body.body;
   newArticle.numberOfLikes = req.body.numberOfLikes;
   await newArticle.save();


  res.json(newArticle);
  
});
app.get("/articles",async(req,res)=>{

    const articles = await Article.find();
  res.json(articles);

})
app.get("/articles/:articleId",async(req,res)=>{

  try {
    const articles = await Article.findById(req.params.articleId);
    res.json(articles);
  } catch (error) {
    res.send("error");

  }
 

})


app.delete("/articles/:articleId",async(req,res)=>{

  try {
    const articles = await Article.findByIdAndDelete(req.params.articleId);
    res.json("delete");
  } catch (error) {
    res.send("error");

  }
})

app.get("/showarticles",async (req,res)=>{
  try {
    const articles = await Article.find();

    res.render("articles.ejs",{
      allArticle : articles
    })
    
  } catch (error) {
    
  }
})
app.get("/", (req,res)=>{
  try {
    res.send("")
    
  } catch (error) {
    
  }
})

app.listen(3001);

