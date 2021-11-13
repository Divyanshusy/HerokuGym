

const mysql = require('mysql')


const DB = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blog'
})


DB.connect((err) => {
  if(!err) {
    console.log("connected to database")
    DB.query('SELECT 1 FROM blogs', (err,results) => {
      if(err) {
        console.log("creating table")
        DB.query('CREATE TABLE blogs( id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, title VARCHAR(60) NOT NULL, img_url TEXT NOT NULL, description VARCHAR(500) NOT NULL)'
        )
        console.log("table created")
      }else {
        console.log("Table alreday exists")
      }
    })

  } else{
    console.log("Failed to connect")
  }
})

module.exports = DB