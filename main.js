const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://0307kwon:dj88407034!@cluster0.etajt.mongodb.net/instagram_clone_coding?retryWrites=true&w=majority";
const client = new MongoClient(url,{
    useUnifiedTopology: true,
});


const dbName = "test";

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        const col = db.collection("people");

        let personDocument = {
            "name": { "first": "Alan", "last": "Turing" },
             "birth": new Date(1912, 5, 23), // June 23, 1912                                                                                                                                 
             "death": new Date(1954, 5, 7),  // June 7, 1954                                                                                                                                  
             "contribs": [ "Turing machine", "Turing test", "Turingery" ],
             "views": 1250000,
        }

        const p = await col.insertOne(personDocument);
        const myDoc = await col.findOne();
        console.log(myDoc.birth);

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);