
const User = require("../model/user")
const { setUser } = require("../service/auth")
const bcrypt =require("bcrypt")

async function Usersignup(req, res) {
    const { name, email, password } = req.body;
    const hashPass=bcrypt.hashSync(password,10)
    const user=await User.create({
        name,
        email,
        password:hashPass,
    })
    if(user){
        return res.redirect("/login")
    }
}

async function UserlogIn(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user)
        return res.render('login', {
            error: "Invalid Details"
        });

    checkPassword=bcrypt.compareSync(password,user.password)

    if(!checkPassword){
        res.render('login')
    }

    const token = setUser(user)
    res.cookie("uid",token)
    return res.redirect("/")
}

async function LogOut (req, res){
    res.clearCookie('uid');
    res.redirect('/login');
}
module.exports = { Usersignup, UserlogIn,LogOut }


