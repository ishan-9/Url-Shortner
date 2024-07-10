const mongoose = require("mongoose")
 const User = require("./user")

const userSchema = new mongoose.Schema({
    shortId: {
        require: true,
        type: String,
        unique:true,
    },
    redirectUrl: {
        require: true,
        type: String,
        // unique: true,
    },
    visitHistory: [
        { timestamps: { type: Number } }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
   },
}, { timestamps: true })

const URL = mongoose.model('url', userSchema);

module.exports = URL;