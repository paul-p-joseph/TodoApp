const express = require("express");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;
const cors = require("cors");
const app = express();
const dbUrlAltas = "mongodb+srv://paul_p_joseph_todo:sQRZ5Yw6NNuBPva3@cluster0.6epk4.mongodb.net/b20wd_db?retryWrites=true&w=majority"
app.use(cors())
app.use(express.json())


app.get("/",async(req,res)=>{
    try {
        let clientInfo = await mongoClient.connect(dbUrlAltas);
        let db = await clientInfo.db('b20wd_db');
        let data = await db.collection('todo_app').find().toArray();
        res.status(200).json(data);
        clientInfo.close();
    } catch(error){console.log(error)}
      
       });
       
app.post("/create-task", async(req,res) =>{
    try{
        let clientInf = await mongoClient.connect(dbUrlAltas);
        let db = await clientInf.db('b20wd_db');
        let data = await db.collection('todo_app').insertOne(req.body)
        res.status(200).json({message:"task created"})
        clientInf.close();
        
    }
    catch(error){console.log(error)}
});

app.put('/update-task/:id',async(req,res) =>{
    try{
        console.log(req.body)
        let clientInf = await mongoClient.connect(dbUrlAltas);
        let db = await clientInf.db('b20wd_db');
        let data = await db.collection('todo_app').findOneAndUpdate({_id: objectId(req.params.id)},{$set: req.body})
        res.status(200).json({message:"task updated"})
        clientInf.close();
    } catch(error){console.log(error)}
})

app.delete('/delete-task/:id',async(req,res) =>{
    try{
        let clientInf = await mongoClient.connect(dbUrlAltas);
        let db = await clientInf.db('b20wd_db');
        let data = await db.collection('todo_app').deleteOne({_id: objectId(req.params.id)})
        res.status(200).json({message:"task deleted"});
        clientInf.close();
    } catch(error){console.log(error)}
})

app.listen(process.env.PORT || 5000, () => "App runs with some port");

