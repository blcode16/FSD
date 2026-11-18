
import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const port = process.env.PORT || 7000;

// MongoDB Atlas connection
const mongoUrl = process.env.MONGO_URI;
const databaseName = "library_db";

const client = new MongoClient(mongoUrl);

let db;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB and start server
async function startServer() {
  try {
    if (!mongoUrl) {
      throw new Error("MONGO_URI environment variable is missing");
    }

    await client.connect();

    db = client.db(databaseName);

    console.log("Connected to MongoDB successfully");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

// CREATE BOOK
// POST /api/v1/books
app.post("/api/v1/books", async (req, res, next) => {
  try {
    const { title, author, category, price } = req.body;

    if (!title || !author || !category || price === undefined) {
      return res.status(400).json({
        message: "All book fields are required"
      });
    }

    const result = await db.collection("books").insertOne({
      title,
      author,
      category,
      price
    });

    res.status(201).json({
      message: "Book created successfully",
      data: {
        _id: result.insertedId,
        title,
        author,
        category,
        price
      }
    });

  } catch (err) {
    next(err);
  }
});

// READ ALL BOOKS OR FILTER BY CATEGORY
// GET /api/v1/books
// GET /api/v1/books?category=Java
app.get("/api/v1/books", async (req, res, next) => {
  try {
    const category = req.query.category;

    const query = category ? { category } : {};

    const books = await db.collection("books")
      .find(query)
      .toArray();

    res.status(200).json({
      message: "Books fetched successfully",
      data: books
    });

  } catch (err) {
    next(err);
  }
});

// READ SINGLE BOOK
// GET /api/v1/books/:id
app.get("/api/v1/books/:id", async (req, res, next) => {
  try {
    const bookId = req.params.id;

    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({
        message: "Invalid book ID"
      });
    }

    const book = await db.collection("books")
      .findOne({ _id: new ObjectId(bookId) });

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.status(200).json({
      message: "Book fetched successfully",
      data: book
    });

  } catch (err) {
    next(err);
  }
});

// UPDATE BOOK
// PUT /api/v1/books/:id
app.put("/api/v1/books/:id", async (req, res, next) => {
  try {
    const bookId = req.params.id;

    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({
        message: "Invalid book ID"
      });
    }

    const { title, author, category, price } = req.body;

    if (!title || !author || !category || price === undefined) {
      return res.status(400).json({
        message: "All book fields are required"
      });
    }

    const book = { title, author, category, price };

    const result = await db.collection("books").updateOne(
      { _id: new ObjectId(bookId) },
      { $set: book }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.status(200).json({
      message: "Book updated successfully",
      data: {
        _id: new ObjectId(bookId),
        ...book
      }
    });

  } catch (err) {
    next(err);
  }
});

// DELETE BOOK
// DELETE /api/v1/books/:id
app.delete("/api/v1/books/:id", async (req, res, next) => {
  try {
    const bookId = req.params.id;

    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({
        message: "Invalid book ID"
      });
    }

    const result = await db.collection("books")
      .deleteOne({ _id: new ObjectId(bookId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.status(200).json({
      message: "Book deleted successfully"
    });

  } catch (err) {
    next(err);
  }
});

// 404 NOT FOUND
app.use((req, res) => {
  res.status(404).json({
    message: "Not Found"
  });
});

// ERROR HANDLING
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  });
});

// START SERVER
startServer();
