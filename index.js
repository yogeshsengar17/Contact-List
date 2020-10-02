const express = require('express');
const path = require('path');
const port = 8000;

const db=require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


var contactList = [
    {
        name:"Rahul",
        phone:"1111111111"
    },
    {
        name:"Tonystark",
        phone:"2222222222"
    },
    {
        name:"Nikhil",
        phone:"3333333333"
    }
]

app.get('/', function(req,res){

    Contact.find({},function(err,contacts){
        if(err){
            console.log("Error in fetching contacts from db")
        }
        return res.render('home',{
            title:"My Contact List",
            contact_list:contacts
        });
    })

    
})
app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"Lets Play with ejs"
    });
})

app.post('/create-contact',function(req,res){
    //contactList.push(req.body);
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log("error in creating a contact");
            return;
        }
        console.log('*****',newContact);
        return res.redirect('back');
    });
        

});

app.get('/delete-contact/',function(req,res){
    let id = req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error in deleting an object from database");
            return;
        }
        return res.redirect('back');
    });
   
    
});


app.listen(port,function(err){
    if(err){
        console.log("error",err);
    }
    console.log("My express js server run at the port",port);
})