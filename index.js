const express=require('express');
const app=express();
const userData=require('./data.json')
const fs=require('fs');
const path=require('path')
const session=require('express-session');
const cookieParser=require('cookie-parser');
const oneDay=100*60*60*24
app.use(session({
    secret:"Cookie",
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:oneDay,
    }
}))
app.get('/test',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.set("view engine","ejs")

app.get('/login',(req,res)=>{
    res.render("login",{message:""});
})

app.post('/login',(req,res)=>{
    let dataJson='';
    let flag=true;
    if(req.body.username.length<5 || req.body.password.length<5 || req.body.password!=req.body.confirmpassword){
        res.render('login',{message:"Invalid username or password"})
    }
    else{
        fs.readFile("./data.json","utf-8",(err,data)=>{
            if(err){
                res.end("error")
            }
            else{
                dataJson=JSON.parse(data);
                dataJson.forEach(x => {
                    if(x.username==req.body.username){
                        res.render("login",{message:"Username Unavailable"});
                    }
                    else{
                        let obj={
                            username:req.body.username,
                            password:req.body.password
                        }
                        dataJson.push(obj)
                        fs.writeFile("./data.json",JSON.stringify(dataJson),(err)=>{if(err){res.end("error")}})
                        res.redirect("/home");
                    }
                });
            }
        })
    }
})

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/login');
})


app.get('/signup',(req,res)=>{
    res.render('signup',{message:''})
})

app.post('/signup',(req,res)=>{
    userData.forEach(x=>{
        if(x.username==req.body.username && x.password==req.body.password){
            res.end("Success")
        }
        else{
            res.render("signup",{message:"Inavlid Username or Password"})
        }
    })
})

app.use("/css",express.static('./public/css'))
app.use("/js",express.static('./public/js'))
app.use("/js",express.static('./public/js'))
app.use(express.static('./public'))

app.listen(3000,(err)=>{
    if(err){
        console.log('Server not Connected :)');
    }
    else{
        console.log('Server Connected :)');
    }
})