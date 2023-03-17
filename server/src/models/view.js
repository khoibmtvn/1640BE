const mongoose = require('mongoose')

const ViewSchema = mongoose.Schema({
    isVisited: {
        type: Boolean
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

module.exports = mongoose.model('view', ViewSchema)