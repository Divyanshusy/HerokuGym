
const express = require('express')
const { createConnection } = require('mysql')
const router = express.Router()
const DB = require("../database/Connection.js")
const Prevention = require("sqlstring");


router.get('/blog', (req, res) => {
    DB.query('SELECT * FROM blogs',(err,blogPost) =>{
        if(err){
            console.log(err)
        } else{
            res.render("blog.hbs", 
            {
                blogPost
            });
        }
    })
})

router.get('/blog-details/:id', (req, res) => {
  const id =req.params.id
  DB.query(`SELECT * FROM blogs WHERE id="${id}"LIMIT 1`,(err,blog) =>{
      if(err){
          console.log(err)
      } else{
          res.render("blog-details.hbs", 
          {
              blog
          });
      }
  })
})
router.get('/', (req, res) => {
    res.render("index")
  })

router.get('/index', (req, res) => {
  res.render("index")
})

router.get('/contact', (req, res) => {
  res.render("contact")
})

router.get('/about-us', (req, res) => {
  res.render("about-us")
})

router.get('/createblog', (req, res) => {
  res.render("createblog")
})

router.post('/createblog', (req, res) => {
  const post = req.body
  DB.query(`INSERT INTO blogs(title,writer,img_url,description)
    VALUES (${Prevention.escape(post.title)},
            ${Prevention.escape(post.writer)},
            ${Prevention.escape(post.img_url)},
            ${Prevention.escape(post.description)})`, (err, result) =>{
            if(err) {
              console.log(err)
            } else{
              res.redirect("/blog")
            } 
            })
      })


router.get('/services', (req, res) => {
  res.render("services")
})

router.get('/team', (req, res) => {
  res.render("team")
})

router.get("*", (req, res) => {
  res.render("404", {
    errorcomment:"Oops Page coundn't be found",
  }); 
});

module.exports = router