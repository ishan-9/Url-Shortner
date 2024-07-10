const URL = require("../model/url");


async function staticgetAllurls(req, res) {
    if (!req.user) return res.redirect('/login')
    
    const allUrls = await URL.find({ createdBy: req.user._id }).populate('createdBy', 'email'); 
    if (allUrls) {
        return res.render('home', {
            urls: allUrls
        })
    }
}

async function StatgetAllUrls(req, res) {
    if (!req.user) return res.redirect('/login');

    try {
        const allUrls = await URL.find().populate('createdBy', 'email'); 
        return res.render('all', {
            urls: allUrls
        });
    } catch (error) {   
        console.error('Error fetching URLs:', error);
        return res.status(500).send('Server Error');
    }
}

async function Usersignup(req, res) {
    return res.render('signup')
}
async function Userlogin(req, res) {
    return res.render('login')
}

module.exports = { staticgetAllurls, Usersignup, Userlogin,StatgetAllUrls}