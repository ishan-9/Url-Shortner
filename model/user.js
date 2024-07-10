const mongoose = require("mongoose")
const {roles} = require("../utilitties/constant")

const userSchema = new mongoose.Schema({
    name: {
        require: true,
        type: String
    },
    email: {
        require: true,
        type: String,
        unique: true,
    },
    password: {
        require: true,
        type: String,
    },
    roles:{
        type : String,
        enum : [roles.admin, roles.client],
        default : roles.client
    }
},
    { timestamps: true })

// userSchema.pre('save',async function(req,res){
//     try {
//         const user = req.user; 
//         if (user.email.toLowerCase() === process.env.ADMIN_email.toLowerCase()) {
//             user.role = roles.admin; 
//             next();
//         } 
//     } catch (error) {
//         console.error('Error in OnlyAdmin middleware:', error);
        
//     }
// })
const User = mongoose.model('user', userSchema);

module.exports = User;
