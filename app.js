const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");


const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

res.sendFile(__dirname+"/Signup.html");
})

app.post("/",function(req,res){
   const name1=req.body.FirstN;
   const name2=req.body.SecondN;
   const email=req.body.email;
  
   var data={
       members: [
           {
               email_address:email,
               status:"subscribed",
               merge_fields:{
                   FNAME:name1,
                   SNAME:name2
               }
           }
       ]
   };
    var json = JSON.stringify(data);

   const url="https://us6.api.mailchimp.com/3.0/lists/d371848478"
   const options = {
       method:"POST",
       auth:"gautham1:4080201d13e23ca8380304f5882f7d9d-us6"
   }
   const rt =https.request(url,options,function(response){

    if(response.statusCode===200){
        res.send("succesfully subscribed");
    }else{
        res.send("Error in submittion plse try again");
    }
            response.on("data",function(data){
               
                console.log(JSON.parse(data));
            })
    })
    rt.write(json);
    rt.end();

    

});

app.listen(3000,function(){
    console.log("server is running on port 3000");
});

