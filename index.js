const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');

var books = [{id:0,name:"Twilight",author:"Stephenie Meyer"},{id:1,name:"Rebecca",author:"Daphne du Maurier"},{id:2,name:"Romeo and Juliet",author:"Shakespeare"}]

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get("/books", (req,res)=>{
    res.send(books);
})
app.post("/book",(req,res)=>{
    books.push({id:req.body.id, name:req.body.name, author:req.body.author})
    res.send(`${JSON.stringify(books)} created`)
})
app.delete("/book/:id", (req,res)=>{
    console.log('delete:id:'+req.params.id)
    books = books.filter(item=> item.id != req.params.id)
    res.send("books left:"+JSON.stringify(books));
})

app.listen(4000,()=>console.log('Listening on 4000'))