const controller = require('../controllers/book');
const router = require('express').Router();

/**
 * @swagger
 *  components:
 *      schema:
 *          Book:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                  name:
 *                      type: string
 */

/**
 * @swagger
 *  components:
 *      schema:
 *          AddOrUpdateBook:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 */

/**
 * @swagger
 * /books:
 *  get:
 *      tags:
 *        - Books
 *      summary: Get all books
 *      content:
 *          application/json:
 *      responses:
 *          200:
 *              description: Return list of all books
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/Book'
 */
router.get('/books', controller.getBooks); 

/**
 * @swagger
 *  /books/{id}:
 *  get:
 *      tags:
 *        - Books
 *      summary: Get a book details
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Id of the book
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Return information about provided id book
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/Book'
 *          404:
 *              description: Book not found!
 */
router.get('/books/:id', controller.getBook);

/**
 * @swagger
 * /books:
 *  post:
 *      tags:
 *        - Books
 *      summary: Insert a new book
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/AddOrUpdateBook'
 *      responses:
 *          200:
 *              description: Book created successfully!
 */
router.post('/books', controller.createBook); 

/**
 * @swagger
 * /books/{id}:
 *  put:
 *      tags:
 *        - Books
 *      summary: Update a book
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Id of the book
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schema/AddOrUpdateBook'
 *      responses:
 *          200:
 *              description: Book updated successfully!
 *          404:
 *              description: Book not found!
 */
router.put('/books/:id', controller.updateBook); 


/**
 * @swagger
 *  /books/{id}:
 *  delete:
 *      tags:
 *        - Books
 *      summary: Delete a book by id
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Id of the book
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Book deleted!
 *          404:
 *              description: Book not found!
 */
router.delete('/books/:id', controller.deleteBook); 

module.exports = router;
