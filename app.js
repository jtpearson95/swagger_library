const express = require('express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

var books = [{id:0,name:"Twilight",author:"Stephenie Meyer"},{id:1,name:"Rebecca",author:"Daphne du Maurier"},{id:2,name:"Romeo and Juliet",author:"Shakespeare"}]

const app = express();
app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Library API",
            version: "1.0.0"
        }
    },
        apis: ["app.js"]
}
/**
 * @swagger
 * /books:
 *  get:
 *      summary: get all books
 *      produces:
 *          application/json
 *  responses:
 *      200: success
 *      description : a library of books
 *      schema:
 *          $ref: "#definitions/books"
 * definitions:
 *  book:
 *      properties:
 *          id:
 *              type: integer
 *          name:
 *              type: string
 * 
 * 
 */


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.get("/books", (req,res)=>{
    res.send(books);
})

/**
 * @swagger
 * /book:
 *  post:
 *      summary: add a book
 *      requestBody:
 *          description: A JSON object of book information
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/definitions/book'
 *      responses:
 *          201:
 *              description: created book entry
 *
 * definitions:
 *  book:
 *      properties:
 *          id:
 *              type: integer
 *          name:
 *              type: string
 *          author:
 *              type: string
 */

app.post("/book", (req, res) => {
    res.send(`${req.body.name} created`);
});

app.listen(4000,()=>console.log('Listening on 4000'))