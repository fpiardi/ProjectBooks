const Book = require('../models/book');

//get all books
exports.getBooks = async (req, res) => {
    Book.findAll()
        .then(books => {
            res.status(200).json({ data: books });
        })
        .catch(err => console.log(err));
}

//get book by id
exports.getBook = async (req, res) => {
    const id = req.params.id;
    Book.findByPk(id)
        .then(book => {
            if (!book) {
                return res.status(404).json({ message: 'Book not found!' });
            }
            res.status(200).json({ data: book });
        })
        .catch(err => console.log(err));
}

//create book
exports.createBook = async (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  Book.create({
    name: name
  })
    .then(result => {
      console.log('Created Book');
      res.status(200).json({
        message: 'Book created successfully!',
        data: result
      });
    })
    .catch(err => {
      console.log(err);
    }); 
}

//update book
exports.updateBook = async (req, res) => {
  const id = req.params.id;
  const updatedName = req.body.name;
  Book.findByPk(id)
    .then(book => {
      if (!book) {
        return res.status(404).json({ message: 'Book not found!' });
      }
      book.name = updatedName;
      return book.save();
    })
    .then(result => {
      res.status(200).json({message: 'Book updated!', data: result});
    })
    .catch(err => console.log(err));
}

//delete book
exports.deleteBook = async (req, res) => {
  const id = req.params.id;
  Book.findByPk(id)
    .then(book => {
      if (!book) {
        return res.status(404).json({ message: 'Book not found!' });
      }
      return Book.destroy({
        where: {
          id: id
        }
      });
    })
    .then(result => {
      res.status(200).json({ message: 'Book deleted!' });
    })
    .catch(err => console.log(err));
}