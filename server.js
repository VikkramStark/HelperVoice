const express = require("express"); 
const app = express(); 

const nodemailer = require("nodemailer"); 

const SENDER_MAIL = "sigmaprojects007@gmail.com"; 
const RECEIVER_MAIL = "vikkram26stark@gmail.com"; 

const transporter = nodemailer.createTransport({
    service:"gmail", 
    auth:{
        user:SENDER_MAIL,    
        pass:"rowxpkqewdhnljqm"  
    }
}); 

const mailoptions = {
    from:SENDER_MAIL, 
}

app.use(express.static("./views")); 
app.use(express.json()); 
app.use(express.urlencoded({extended:false})); 

app.get("/", (req,res) => {
    res.render("index.html"); 
}) 

app.post("/help", (req,res) => {
    const {latitude, longitude} = req.body.location; 
    console.log("Data Received!")
    console.log("Latitude: "+latitude); 
    console.log("Longitude: "+longitude); 
    // res.send("Help reached Server!"); 

    const mailoptions = {
        from:SENDER_MAIL, 
        to:RECEIVER_MAIL, 
        subject:"Test Helpline Text from Nodemailer", 
        html:`<h2>This is a test Mail from Nodemailer</h2><br> Latitude: ${latitude} <br> Longitude: ${longitude}<br><br><a href = "http://maps.google.com/maps?q=${latitude},${longitude}">Click here to View on Map</a><br><iframe src = "http://maps.google.com/maps?q=${latitude},${longitude}"></iframe>`    
    }
    transporter.sendMail(mailoptions, (err, info) => {
        if(err){
            console.log(err); 
            res.status(500).send("Internel Server Error Occured"); 
        }else{
            console.log("Email sent: "+info.response); 
            res.status(201).send("Email Sent Successfully!!");  
        }
    }); 
})

const PORT = 5000; 
app.listen(PORT, () => {
    console.log(`[SERVER STARTED] http://localhost:${PORT}`); 
}); 






