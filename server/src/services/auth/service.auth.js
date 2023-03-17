const { ValidatePassword, GenerateAccessTokenKey } = require("../../utils");
const { BadRequestError } = require("../../utils/error-app");
const UserServer = require("../commons/service.user");

const userServer = new UserServer

// const signUp = async (createData) => {
//     const createdUser = await userServer.create(createData)
//     return createdUser
// }

const signIn = async (userData) => {
    const {username, password} = userData

    const foundUser = await userServer.findOne({username}, ["id", "username", "password", "role"])

    const validatePassword = await ValidatePassword(password, foundUser.password)

    if(!validatePassword) throw new BadRequestError('Wrong username/password')

    const accessToken = GenerateAccessTokenKey({username, role: foundUser.role.name})

    return accessToken
}

module.exports = {
    signIn,
    // signUp
}