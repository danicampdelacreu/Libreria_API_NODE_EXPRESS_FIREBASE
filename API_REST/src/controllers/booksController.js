const admin = require('firebase-admin');
const serviceAccount = require('../../code_BBDD_libreria.json');

// Inicializacion de la aplicacion Firebase
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://bbdd-libreria.firebaseio.com',
  });
} catch (error) {
  console.error('Error al inicializar Firebase:', error);
}

const db = admin.firestore();
const booksCollection = db.collection('libreria');

// Obtener la lista de libros
exports.getBooks = (req, res) => {
  booksCollection
    .get()
    .then((snapshot) => {
      const books = [];
      snapshot.forEach((doc) => {
        books.push({ id: doc.id, ...doc.data() });
      });
      res.json(books);
    })
    .catch((error) => {
      console.error('Error al obtener la lista de libros:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    });
};

// Obtener detalles de un libro por su ID
exports.getBookById = (req, res) => {
  const bookId = req.params.id;
  booksCollection
    .doc(bookId)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        res.status(404).json({ error: 'Libro no encontrado' });
        return;
      }
      res.json({ id: doc.id, ...doc.data() });
    })
    .catch((error) => {
      console.error('Error al obtener detalles del libro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    });
};

// Crear un nuevo libro
exports.createBook = (req, res) => {
  const newBook = req.body;
  booksCollection
    .add(newBook)
    .then((docRef) => {
      res.json({ id: docRef.id, ...newBook });
    })
    .catch((error) => {
      console.error('Error al crear un nuevo libro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    });
};

// Actualizar un libro por su ID
exports.updateBook = (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;
  booksCollection
    .doc(bookId)
    .update(updatedBook)
    .then(() => {
      res.json({ id: bookId, ...updatedBook });
    })
    .catch((error) => {
      console.error('Error al actualizar el libro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    });
};

// Eliminar un libro por su ID
exports.deleteBook = (req, res) => {
  const bookId = req.params.id;
  booksCollection
    .doc(bookId)
    .delete()
    .then(() => {
      res.json({ message: 'Libro eliminado exitosamente' });
    })
    .catch((error) => {
      console.error('Error al eliminar el libro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    });
};
