const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var noteSchema = new mongoose.Schema({
  user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, 
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
  
});

//Export the model
module.exports = mongoose.model('Note', noteSchema);