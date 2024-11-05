import { Request, Response } from 'express';
import Book from '../models/book';


//get all books
export async function getBooks(req: Request, res: Response) {
  Book.findAll()
        .then((books: typeof Book[]) => {
            res.status(200).json({ data: books });
        })
        //.catch((err: any) => console.log(err));
}

//get book by id
export async function getBook(req: Request, res: Response) {
    const id = req.params.id;
    Book.findByPk(id)
        .then((book: typeof Book) => {
            if (!book) {
                return res.status(404).json({ message: 'Book not found!' });
            }
            res.status(200).json({ data: book });
        })
        .catch((err: any) => console.log(err));
}

//create book
export async function createBook(req: Request, res: Response) {
  console.log(req.body);
  const name = req.body.name;
  Book.create({
    name: name
  })
    .then((result: any) => {
      console.log('Created Book');
      res.status(200).json({
        message: 'Book created successfully!',
        data: result
      });
    })
    .catch((err: any) => {
      console.log(err);
    }); 
}

//update book
export async function updateBook(req: Request, res: Response) {
  const id = req.params.id;
  const updatedName = req.body.name;
  Book.findByPk(id)
    .then((book: typeof Book) => {
      if (!book) {
        return res.status(404).json({ message: 'Book not found!' });
      }
      book.name = updatedName;
      return book.save();
    })
    .then((result: any) => {
      res.status(200).json({message: 'Book updated!', data: result});
    })
    .catch((err: any) => console.log(err));
}

//delete book
export async function deleteBook(req: Request, res: Response) {
  const id = req.params.id;
  Book.findByPk(id)
    .then((book: typeof Book) => {
      if (!book) {
        return res.status(404).json({ message: 'Book not found!' });
      }
      return Book.destroy({
        where: {
          id: id
        }
      });
    })
    .then(()  => {
      res.status(200).json({ message: 'Book deleted!' });
    })
    .catch((err: any) => console.log(err));
}
