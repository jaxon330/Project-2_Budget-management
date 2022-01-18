
const mongoose = require('mongoose')

const mongoURI = 'mongodb://localhost:27017/exenses'
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(int => console.log('connected to db:', int.connections[0].name))
.catch(err => console.error(err))

module.exports = mongoose