// importacion modulos y rutas

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const booksRoutes = require('./routes/booksRoutes');

const app = express();
app.use(cors());

// Utiliza solo el nombre del archivo para la ruta, ya que está en la misma carpeta
const serviceAccount = require('../code_BBDD_libreria.json');

// Inicializacion de la aplicacion Firebase
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://bbdd-libreria.firebaseio.com',
  });
} catch (error) {
  console.error('Error al inicializar Firebase:', error);
}

// Analizar datos en formato JSON de las solicitudes
app.use(express.json());

// Para utilizar rutas definidas en el archivo booksRoutes.js
app.use('/books', booksRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`¡Funciona todo bien http://localhost:${PORT}! 🎉`);
});


