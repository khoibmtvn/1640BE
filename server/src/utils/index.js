const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_KEY } = require('../config')

const HashPassword = async (password) => {
    return await argon2.hash(password)
}

const ValidatePassword = async (currentPassword, hashPassword) => {
    return await argon2.verify(hashPassword, currentPassword)
}

const GenerateAccessTokenKey = (payload) => {
    return jwt.sign(payload, ACCESS_TOKEN_KEY)
}

const ValidateAccessTokenKey = (accessTokenKey) => {
    const payload = jwt.verify(accessTokenKey, ACCESS_TOKEN_KEY)
    return payload
}

module.exports = {
    HashPassword,
    ValidatePassword,
    GenerateAccessTokenKey,
    ValidateAccessTokenKey
}