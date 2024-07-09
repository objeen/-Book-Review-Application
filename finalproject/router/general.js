const express = require('express');

let books = require("./booksdb.js");

let isValid = require("./auth_users.js").isValid;

let users = require("./auth_users.js").users;

const public_users = express.Router();


public_users.post("/register", (req,res) => {

    //Write your code here
    const username = req.body.username;
    const password = req.body.password;
    
    if (username && password) {
        if (!isValid(username)) {
            // Your code here
            users.push({"username":username,"password":password});
      return res.status(200).json({message: "Customer successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "Customer with same username already exists!"});  
        }
    }
    return res.status(300).json({message:   "Unable to register customer"});
  
  });

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
   // Assuming you have a database or some data source for books
  // Retrieve the list of books from the data source
  const books = [
    { title: "Book 1", author: "Author 1" },
    { title: "Book 2", author: "Author 2" },
    { title: "Book 3", author: "Author 3" }
  ];

  // Return the list of books as a JSON response
  res.json(books);

  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
  res.send(books[isbn])
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let booksbyauthor = [];
    let isbns = Object.keys(books);
    isbns.forEach((isbn) => {
      if(books[isbn]["author"] === req.params.author) {
        booksbyauthor.push({"isbn":isbn,
                            "title":books[isbn]["title"],
                            "reviews":books[isbn]["reviews"]});
      }
    });
    res.send(JSON.stringify({booksbyauthor}, null, 4));
  });

/// Get all books based on title

public_users.get('/title/:title', function (req, res) {
    const title = req.params.title; // Get the title from the request parameters
  
    // Assuming you have a books array with book objects
    const book = books.find((book) => book.title === title);
  
    if (book) {
      // If a book with the given title is found, send it as a response
      res.json(book);
    } else {
      // If no book with the given title is found, send an error response
      res.status(404).json({ message: "Book not found" });
    }
  });
  
  

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(review[isbn])
  
  return res.status(300).json({message:    "This is the review of the book."});
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
