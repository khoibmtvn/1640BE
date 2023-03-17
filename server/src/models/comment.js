const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    content: {
        type: String,
        max: 255

    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    isAnonymously: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
})

module.exports = mongoose.model('comment', CommentSchema)