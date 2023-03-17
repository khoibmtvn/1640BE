const mongoose = require("mongoose")

const DepartmentSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    desc: String,
}, {
    timestamps: {
        createdAt: 'created_at', // Use `created_at` to store the created date
        updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
})

module.exports = mongoose.model('Department', DepartmentSchema)