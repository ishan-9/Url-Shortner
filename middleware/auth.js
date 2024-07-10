
require('dotenv').config(); 

const { getUser } = require('../service/auth');
const { roles } = require("../utilitties/constant");

async function OnlyLoggedUser(req, res, next) {
    const userUid = req.cookies?.uid;
    if (!userUid) {
        console.log('No UID found in cookies, redirecting to /login');
        return res.redirect('/login');
    }

    try {
        const user = await getUser(userUid); 
        if (!user) {
            console.log('User not found, redirecting to /login');
            return res.redirect('/login');
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error in OnlyLoggedUser middleware:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function OnlyAdmin(req, res, next) {
    try {
        const user = req.user; 
        if (user.email.toLowerCase() === process.env.ADMIN_email.toLowerCase()) {
            user.role = roles.admin; 
            next();
        } else {
            console.log('User is not an admin, sending error response');
            return res.status(403).json({ msg: "You are not an admin" });
        }
    } catch (error) {
        console.error('Error in OnlyAdmin middleware:', error);
        res.status(500).send('Internal Server Error');
    }
}

"pan chhod aa badhi vat, jena mate call karo hato e j kav..can we talk? avu me puchyu hatu"
"himmat bhegi karine puchyu tu bcz kal mane realise thyu k hu kai"

async function CheckAuth(req, res, next) {
    const userUid = req.cookies?.uid;
    

    try {
        const user = await getUser(userUid); 
        req.user = user;
         next();
     } catch (error) {
        console.error('Error in CheckAuth middleware:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    OnlyLoggedUser,
    CheckAuth,
    OnlyAdmin
};
