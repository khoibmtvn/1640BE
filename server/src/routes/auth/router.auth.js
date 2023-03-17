const express = require("express");
const { verify } = require("jsonwebtoken");
const { signIn } = require("../../services/auth/service.auth");
const router = express.Router();
const {verifyToken, isAdmin } = require ("../../middlewares/auth");

router.post("/signIn", verifyToken, async(req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) throw new ValidationError("Missing Text");

        const data = await signIn(req.body);
        return res.json(data);
    } catch (err) {
        next(err);
    }
});

router.get("/login", verifyToken, async(req, res, next)=> {
    try {
        if(req.user){
            res.redirect('/')
    }}
    catch (err) {
        console.log(error)
        return res.status(400).render('/LoginPage/LoginPage')
    }
});
router.post('/login', async (req, res) => { 
    //Validation
    const { error } = loginValidation(req.body)
    if(error)
    return res.status(400).render('/LoginPage/LoginPage')
    try{
        //Find user
        const user = await user.findOne({ username: req.body.username});
    
        //Check exist the user
        if (!user)
		return res.status(400).render('/LoginPage/LoginPage')
    
        //Check password
        const validPassword = await argon2.verify(user.password, req.body.password)
        if (!validPassword)
		return res.status(400).render('/LoginPage/LoginPage')
        
        //Find role
        const roles = await roles.find()

        //Create role
        let roleList = []

        user.roles.forEach(role => {
            for(let i = 0; roles[i] != undefined; i++){
                if(role.roleId == roles[i].id) return roleList.push(roles[i].name)
            }
        });
        //Create a token
        const accessToken = jwt.sign({name: user.username, roles: roleList}, process.env.ACCESS_TOKEN_SECRET); 
        res.cookie("token", accessToken);
        for(let i = 0; roleList[i] != undefined; i++){
            if(roleList[i] == "Admin" || roleList[i] == "QA manager"){
                return res.redirect('//LoginPage/LoginPage')
            }
        }
        res.redirect("/")
        //res.header('Auth-Access-Token', accessToken).send(accessToken);
    } catch(error){
        console.log(error)
		return res.status(400).render('/LoginPage/LoginPage')
    }
});

//Logout
//--Method:Get 
router.get('/logout', (req, res) => {
    try{
        res.clearCookie('token')
        res.redirect('/loginPage')
    } catch(err){
        console.log(error)
		return res.status(400).render('/LoginPage/LoginPage')
    }   

} );

module.exports = router;