if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const Book = require("../models/book");
const bookDetails = require("./bookDB");
const dbUrl = process.env.DB_URL;

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Mongo Connected");
  })
  .catch((err) => {
    console.log("mongo error");
  });

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const seedDB = async () => {
  await Book.deleteMany({});
  for (let i = 0; i < 28; i++) {
    const random_rate = randomIntFromInterval(3, 5);
    const random_number = randomIntFromInterval(1, 20);
    const random_mrp = randomIntFromInterval(50, 200);
    const book = new Book({
      title: `${bookDetails[i].title}`,
      genre: `${bookDetails[i].genre}`,
      author: `${bookDetails[i].author}`,
      description: `${bookDetails[i].description}`,
      rating: random_rate,
      mrp: `${random_mrp}`,
      available_copies: random_number,
    });
    await book.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
