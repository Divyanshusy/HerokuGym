const express = require('express');
const Routes = require("./routes.js");
const path = require("path");
const hbs = require("hbs");
const methodOverride = require("method-override");
const bodyParserq = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const port = 3000;


//console.log(path.join(__dirname,'../public'));



//built in middleware
const staticpath = path.join(__dirname,'../public');
const templatepath = path.join(__dirname,'../templates/views');
const partialpath = path.join(__dirname,'../templates/partials');


//to set view engine
app.set("view engine","hbs");
app.set("views",templatepath);
hbs.registerPartials(partialpath);

// parse application/x-www-form-urlencoded
app.use(bodyParserq.urlencoded({ extended: true}));
 
// parse application/json
app.use(bodyParserq.json());

//mail sender
app.post('/send', async(req,res) => {
  const output= `
  <p> This is an confirmation mail sent to ${req.body.mailid}. Your entered details are </p>
  <h2>   Name :${req.body.name}</h2>
  <h2>   Email :${req.body.mailid}</h2> 
  <h2>   Commented query :${req.body.comment}</h2>  
  <h5> Thank you for interest we will respond shorty </h5>

  `;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'luckygymmailer@gmail.com', // generated ethereal user
      pass: 'Rdx09470', // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // send mail with defined transport object
    let info = await transporter.sendMail({
    from: '"Lucky Gym" <luckygymmailer@gmail.com>', // sender address
    to: req.body.mailid, // list of receivers
    subject: "Gym Query", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.render("contact", {msg:'Thank you for your interest we will respond shorthly..  Be Safe Be Happy'});
});

//static files
app.use(express.static(staticpath));


//method override
app.use(methodOverride('_method'));

//template engine route
app.use("/", Routes)



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})