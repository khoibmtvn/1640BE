const express = require('express')
const mongoose = require('mongoose')
const { DATABASE_URL, PORT } = require('./config');
const { connectDatabase } = require('./database');
const ErrorHandler = require('./middlewares/error-handler')

//Admin 
const adminUserRouter = require('./routes/admin/router.admin.user')
const adminRoleRouter = require('./routes/admin/router.admin.role')
const adminCategoryRouter = require("./routes/admin/router.admin.category")
const adminDepartmentRouter = require("./routes/admin/router.admin.department")
const adminSubmissionRouter = require("./routes/admin/router.admin.submission")
const adminIdeaRouter = require("./routes/admin/router.admin.idea")
const authRouter = require("./routes/auth/router.auth")


const START_APP = async() => {
    const app = express();

    await connectDatabase()

    app.use(express.json())

    //auth
    app.use('/auth', authRouter)

    // admin
    app.use('/admin/user',  adminUserRouter)
    app.use('/admin/role', adminRoleRouter)
    app.use('/admin/category', adminCategoryRouter)
    app.use('/admin/department', adminDepartmentRouter)
    app.use('/admin/submission', adminSubmissionRouter)
    app.use('/admin/idea', adminIdeaRouter)

    app.use(ErrorHandler)

    app.listen(PORT, () => {
        console.log(`Server run in port: ${PORT}`)
    })
}

START_APP()