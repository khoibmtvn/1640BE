const mongoose = require('mongoose')

const ReactionSchema = mongoose.Schema({
    reactionType: {
        type: Number,
        require: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
})

module.exports = mongoose.model('reaction', ReactionSchema)