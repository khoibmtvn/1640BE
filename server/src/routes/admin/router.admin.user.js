const express = require("express");
const router = express.Router();
const UserServer = require("../../services/commons/service.user");
const { ValidationError } = require("../../utils/error-app");
const userServer = new UserServer();
const {verifyToken, isAdmin } = require ("../../middlewares/auth") ;
const role = require("../../models/role");

//Find all
router.get("/", verifyToken, isAdmin, async(req, res, next) => {
    try {
        const users = await userServer.find();
        return res.json(users);
    } catch (err) {
        next(err);
    }
});

//Create User
router.post("/", verifyToken, isAdmin, async(req, res, next) => {
    try {
        const { username, password, first_name, last_name, role_id, department_id, emails, phones, streets, cities, countries,  } = req.body;

        if (!username || !password || !role_id) throw new ValidationError("Missing Text");

        const createdUser = await userServer.create(req.body);
        return res.json(createdUser);
    } catch (err) {
        next(err);
    }
    if (password != confirmPassword){
        console.log('Error Password')
        return res.json(createdUser)
    }
    const user = await UserServer.findOne({username})
    if(user)
    return res.json(createdUser)

    const HashPasword = await argon2.hash(password)

    let contact = {
        emails: [],
        phones:[],
        addresses:[]

    }
    
    let fullName = {
        first_name:[],
        last_name: []
    }
    
    
    let roleList = [];
    if(role_id != undefined){
        role_id.forEach(roleId => {
            if(roleId == "") return
            roleList.push({roleId})
        })
    }
    if(emails != undefined){
        emails.forEach(email => {
            if(email == "") return
            contact.emails.push({email})
        });
    }
    if(phones != undefined){
        phones.forEach(phone => {
            if(phone == "") return
            contact.phones.push({phone})
        });
    }
    if(streets || cities || countries){
        for(let i = 0; streets[i] != undefined; i++){
            if(streets[i] == "" && cities[i] == "" && countries[i] == "") continue
            const addressHandle = { street: streets[i],
                                    city: cities[i],
                                    country: countries[i]
                                }
            contact.addresses.push(addressHandle)
        }
    }
    let department = {
        department_Id,
        isQACoordinator: false
    }

    for(let i = 0; roles[i] != undefined; i++){
        const findRole = await Role.findOne({ _id: roles[i]})

        if(findRole.name == 'QA coordinator') {
            department.isQACoordinator = true
        }

    }
    const newUser = new User ({
        username: username,
        password: hashpassword,
        fullName: fullName,
        role_id: roleList,
        department,
        contact: contact
    })
    await newUser.save()
    res.redirect(createdUser)
    
});

//Fine One
router.get("/:id", verifyToken, isAdmin, async(req, res, next) => {
    try {
        const { id } = req.params;

        const foundUser = await userServer.findOne(id);
        return res.json(foundUser);
    } catch (err) {
        next(err);
    }
});

//Update
router.patch("/:id", verifyToken, isAdmin, async(req, res, next) => {
    try {
        const { password } = req.body;
        const { id } = req.params;

        if (!password) throw new ValidationError("Missing Text");

        const updatedUser = await userServer.update(id, req.body);

        return res.json(updatedUser);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", verifyToken, isAdmin, async(req, res, next) => {
    try {
        const { id } = req.params;


        const deletedUser = await userServer.delete(id);
        return res.json(deletedUser);
    } catch (err) {
        next(err);
    }
});

module.exports = router;