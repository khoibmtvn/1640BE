const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String
    },
    closureDate: {
        type: Date

    },
    finalClosureDate: {
        type: Date
    },

}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
})

module.exports = mongoose.model('submission', submissionSchema);