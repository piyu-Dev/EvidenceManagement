// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const ComplaintSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     desc: {
//         type: String,
//         required: true,
//     },
//     image: {
//         type: String,
//     },
//     address: {
//         type: String,
//         required: true,
//     },
//     time: {
//         type: Date,
//         default: Date.now,
//     }
// });


const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    address: {
        iv: { type: String },
        encryptedData: { type: String },
        key: { type: String }
    },
    image: {
        iv: { type: String },
        encryptedData: { type: String },
        key: { type: String }
    },
    title: {
        iv: { type: String },
        encryptedData: { type: String },
        key: { type: String }
    },
    desc: {
        iv: { type: String },
        encryptedData: { type: String },
        key: { type: String }
    },
    time: {
        type: Date,
        default: Date.now,
    },
    detail: {
        type: String,
        required: true
    },
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            message: String,
            time: { type: Date, default: Date.now }
        }
    ],
    walletAdd:{
        type:String,
        require:true,
    },
    isResolved:{
        type:Boolean,
        deafult:false
    }
});

const ComplaintModel = mongoose.model("complaint", ComplaintSchema);
module.exports = ComplaintModel;