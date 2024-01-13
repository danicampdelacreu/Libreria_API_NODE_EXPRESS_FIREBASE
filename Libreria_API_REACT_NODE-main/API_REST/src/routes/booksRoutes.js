const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

// Obtener la lista de libros
router.get('/', booksController.getBooks);

// Obtener Explicacion del libro por su id
router.get('/:id', booksController.getBookById);

// Crear un nuevo libro
router.post('/', booksController.createBook);

// Actualizar libro por su id
router.put('/:id', booksController.updateBook);

// Eliminar libro por su id
router.delete('/:id', booksController.deleteBook);

module.exports = router;
