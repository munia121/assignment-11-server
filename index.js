const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
require('dotenv').config();
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6irp4bx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const database = client.db("BookLibrary");
        const bookCollection = database.collection("Books");
        const categoryCollection = database.collection("BookCategory");


        // app.get('/books', async (req, res) => {
        //     const cursor = bookCollection.find();
        //     const result = await cursor.toArray();
        //     res.send(result)
        // })

        app.post('/addBooks', async (req, res) => {
            const book = req.body;
            // console.log(book) 
            const result = await bookCollection.insertOne(book);
            res.send(result);
            // console.log(result)
        })




        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('My server is running!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})