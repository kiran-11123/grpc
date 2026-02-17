import path from 'path'
import * as grpc from '@grpc/grpc-js'
import { GrpcObject , ServiceClientConstructor } from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'



const packageDefiniton = protoLoader.loadSync(path.join(__dirname ,'./a.proto'))

const personProto = grpc.loadPackageDefinition(packageDefiniton);

const PERSONS = [
    {
        name:"Kiran",
        age:20
    },{
        name:"Varun",
        age:"22"
    }

]

//call -> req
//callback ->res.json

//@ts-ignore
function addPerson(call , callback){
    console.log(call);

    let person = {
        name : call.request.name,
        age : call.request.age
    }
    PERSONS.push(person);
    callback(null , person)
}


//@ts-ignore
function getPersonByName(call , callback){
   
    const name = call.request.name;
   const person = PERSONS.find(x => x.name ===name)
   callback(null ,name);

   
    
}

//const app = express()
const server = new grpc.Server();

//app.use("/api/v1/user" , userHandler)
//app.use("/api/v1/todo" , todoHandler)
server.addService((personProto.AddressBookService as ServiceClientConstructor).service ,{addPerson : addPerson})


//app.listen()
server.bindAsync('0.0.0.0:50051' ,grpc.ServerCredentials.createInsecure() ,()=>{
    server.start();
})
