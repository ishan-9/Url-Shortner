const URL = require("../model/url")
const User = require("../model/user")   
const shortid = require("shortid")
const mongoose = require("mongoose")


async function createShortid(req, res) {
    const body = req.body;
    if (!body.url) return res.status(404).json({ msg: 'url is required' });
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id
    })
    return res.render('home', { id: shortID })
}

async function visitUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({ shortId },
        {
            $push: {
                visitHistory: {
                    timestamps: Date.now()
                }
            }
        }
    )
    res.redirect(entry?.redirectUrl)
}

async function getanalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId })
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory })
}


async function getAllUrls(req, res) {
    if (!req.user) return res.redirect('/login')

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

async function deleteUrl (req, res){
        const { shortId } = req.params;
        try {
            const urlToDelete = await URL.findOne({ shortId }).populate('createdBy', 'email');
            await URL.deleteOne({ shortId });
            res.render('all', 
              {  shortId : urlToDelete}
            ); 

        } catch (error) {
            console.error('Error deleting URL:', error);
        }
    }; 

module.exports = {
    createShortid,
    visitUrl,
    getanalytics,
    getAllUrls,
    deleteUrl
}