
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI
console.log(MONGODB_URI);
mongoose.connect('mongodb://localhost:27017/exenses', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(int => console.log('connected to db:', int.connections[0].name))
.catch(err => console.error(err))

module.exports = mongoose