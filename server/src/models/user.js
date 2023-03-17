const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true, 
    },
    profile: {
        first_name: String,
        last_name: String,
        email: String,
        phone: String,
        avatar_path: String
    },
    address: {
        street: String,
        district: String,
        city: String,
        country: String,
    },
    // role_id: {
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'Role'
    // },
    role: {
        id: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'role'
        },
        name: String
    } 
}, {
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
      updatedAt: 'updated_at' // and `updated_at` to store the last updated date
    }
})

module.exports = mongoose.model('User', UserSchema)