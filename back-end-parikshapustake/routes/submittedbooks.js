
const express = require('express');
const router = express.Router();
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Enable CORS for all routes
app.use(cors());

// Connect to mongoose
mongoose.connect('mongodb://localhost/parikshapustake')
  .then(() => console.log('Connected to Database'))
  .catch(err => console.log('Error : ', err));

 // Review Schema
const reviewSchema = new mongoose.Schema({
    reviewer_name: String,
    review: String,
    score: Number,
  });
  
  // Book Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    publisher: String,
    status: String,
    reviews: [reviewSchema],
  });

const bookModel = mongoose.model('submittedbooks', bookSchema);


  

//   async function insertBooks() {
//     try {
//       for (const book of submittedBooks) {
//         const newBook = new bookModel(book);
//         await newBook.save();
//         console.log(`Inserted book: ${book.title}`);
//       }
//     } catch (error) {
//       console.error(`Error inserting books: ${error}`);
//     }
//   };

//   insertBooks();



  // endpoint to get all the submitted Books
router.get('/' , async (req,res) => {
const submittedBooks = await bookModel.find();
  res.send(submittedBooks);
});

/* router.get('/api/submittedbooks' , (req,res) => {
    res.send(submittedBooks);
}); */


module.exports = router;