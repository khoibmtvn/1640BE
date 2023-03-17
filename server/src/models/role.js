const mongoose = require("mongoose")

const RoleSchema = mongoose.Schema({
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

module.exports = mongoose.model('Role', RoleSchema)