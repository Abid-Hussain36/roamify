import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://abidhussain:Diomedes13%25@cluster0.n3iiq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

try{
    await client.connect();
    await client.db("admin").command({ping: 1});
    console.log("Pinged the db!");
} catch(err){
    console.log(err);
}

let db = client.db("roamify")
export default db;