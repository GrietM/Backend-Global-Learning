const mongoose = require("mongoose") // es una libreria que permite crear los schemas, modelos, etc para mongo? (habia una sigla...)

const {Schema} = mongoose

const bookModel = new Schema({
  title: {type: String},
  author: {type: String},
  genre: {type: String},
  read: {type: Boolean}
},
{
  collection: 'books' //para manejar de manera explicita el nombre de mi colleccion--- probar cambiandolo a ver q onda
}
)

module.exports = mongoose.model ("Book", bookModel)

