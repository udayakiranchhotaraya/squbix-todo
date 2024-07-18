const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    status : {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const TodoModel = mongoose.model('Todo', TodoSchema);
module.exports = TodoModel;