const express = require('express');

let books = require("./booksdb.js");

let isValid = require("./auth_users.js").isValid;

let users = require("./auth_users.js").users;

const public_users = express.Router();


public_users.post("/register", (req,res) => {

    //Write your code here

    app.post('/customer/login', function(req, res) {
        const username = req.body.username;
        const password = req.body.password;
      
        // Check if username and password are provided
        if (!username || !password) {
          res.status(400).json({ message: 'Username and password are required.' });
          return;
        }
      
        // Check if the username and password match the registered user
        if (!checkIfUsernameAndPasswordMatch(username, password)) {
          res.status(401).json({ message: 'Invalid username and/or password.' });
          return;
        }
      
        // Generate a JWT token for the authenticated user
        const token = generateToken(username);
      
        // Save the token in the session or send it as a response
        res.status(200).json({ token: token });
      });
    
    app.post('/register', function(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  // Check if username and password are provided
  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required.' });
    return;
  }

  // Check if the username already exists
  if (checkIfUsernameExists(username)) {
    res.status(409).json({ message: 'Username already exists.' });
    return;
  }

  // Register the new user
  registerUser(username, password);

  res.status(201).json({ message: 'User registered successfully.' });
});
  
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
  regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.username;
  
    // Check if the username is provided
    if (!username) {
      res.status(400).json({ message: 'Username is required.' });
      return;
    }
  
    // Filter and delete the reviews based on the session username
    const filteredReviews = deleteReviewsByUser(isbn, username);
  
    if (filteredReviews.length > 0) {
      res.status(200).json({ message: 'Review(s) deleted successfully.' });
    } else {
      res.status(404).json({ message: 'No reviews found for the given ISBN and username.' });
    }
  });
  app.post('/review/:isbn', function(req, res) {
    const isbn = req.params.isbn;
    const review = req.query.review;
    const username = req.session.username;
  
    // Check if the review and username are provided
    if (!review || !username) {
      res.status(400).json({ message: 'Review and username are required.' });
      return;
    }
  
    // Check if the user has already posted a review for the same ISBN
    const existingReview = getExistingReview(isbn, username);
  
    if (existingReview) {
      // Modify the existing review
      modifyReview(isbn, username, review);
      res.status(200).json({ message: 'Review modified successfully.' });
    } else {
      // Add a new review
      addReview(isbn, username, review);
      res.status(201).json({ message: 'Review added successfully.' });
    }
  });
  public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  
  // Assuming you have a database or some data source where the book reviews are stored
  // You can fetch the book reviews based on the provided ISBN
  const bookReviews = fetchBookReviews(isbn);
  
  // Check if any book reviews were found
  if (bookReviews.length > 0) {
    res.status(200).json(bookReviews);
  } else {
    res.status(404).json({ message: 'No book reviews found for the provided ISBN.' });
  }
});
  const isbn = req.params.isbn;
  res.send(review[isbn])
  
  return res.status(300).json({message:    "This is the review of the book."});
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
