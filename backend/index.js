import express from 'express';
import bodyParser from 'body-parser';

const app= express();
app.use(bodyParser.json());



function add(a,b){
    return a+b;
}

app.post("/rpc" , (req,res)=>{
        
    const{jsonrpc , method,params,id} = req.body;

    if(jsonrpc!=='2.0' || !method || !Array.isArray(params)){
         return res.status(400).json({
            jsonrpc :"2.0",
            error:{code : -32600}
         })
    }

    //execute the method

let result;

switch(method){
      
    case "add":
        result = add(params[0] , params[1]);
        break;
    default:
       return  res.status(404).json({
            jsonrpc:"2.0",
            error:{code:-32600}
        })
}

return res.status(200).json({
    jsonrpc:"2.0",
    error:{
        code:-32601
    }
})
})





app.listen(5000 , ()=>{
    console.log("Server is running on port 5000");  
})