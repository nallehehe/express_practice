const ErrorResponse = require('../middlewares/errorResponse');
const Book = require('../models/book');

exports.createReview = async (req, res, next) => {
  try {
    const { ...bookData } = req.body;

    bookData.user = req.userId;

    const book = await new Book(bookData).save();

    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
    return next(new ErrorResponse('Failed to create review', 500));
  }
};
