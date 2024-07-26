const Book = require('../models/book');

Book.findAll()
    .then(books => {
        console.log(books)
        if (books.length == 0) {
            console.log("Seeding database with initial data");
            Book.bulkCreate([
            { name: 'Don Quixote' },
            { name: 'A Tale of Two Cities' },
            { name: 'The Lord of the Rings' },
            { name: 'The Little Prince'},
            { name: 'Harry Potter and the Philosopher Stone' },
            { name: 'And Then There Were None' },
            { name: 'The Hobbit' },
            { name: 'Dream of the Red Chamber' },
            { name: 'The Lion, the Witch and the Wardrobe'},
            { name: 'The Da Vinci Code' },
            { name: 'Austerlitz' },
            { name: 'The Amber Spyglass' },
            { name: 'Never Let Me Go' },
            { name: 'Between the World and Me' },
            { name: 'Half of a Yellow Sun' },
            { name: 'Life After Life' },
            { name: 'The Noonday Demon' },
            { name: 'The Underground Railroad' },
            { name: 'The Emperor of All Maladies' },
            { name: 'The Green Road' },
            { name: 'Moneyball' },
            { name: 'Night Watch' },
            { name: 'Why Be Happy When You Could Be Normal?' },
            { name: 'Thinking, Fast and Slow' },
            { name: 'The Spirit Level' },
        ]).then(() => 
            console.log("Book data have been saved")
        );
        }
    })
    .catch(err => console.log(err));