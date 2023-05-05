const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send('Hello');
})

app.get('login',(req,res)=>{
    res.send
})
app.use(express.static('./public'))








app.listen(3000,(err)=>{
    if(err){
        console.log('Server not Connected :)');
    }
    else{
        console.log('Server Connected :)');
    }
})