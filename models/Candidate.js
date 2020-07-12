const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
    name: String, 
    phone: String,
    email: String,
    address: String,
    // street: String,
    // city: String,
    // state: String,
    // zip: String,
    experience: String,
    qualifications: String,
    commute: String,
    status: String,
    salary: String,
    position: String,
    // ranking: String,
    // photo: ?
},
{timestamps: true}
)

const Candidate = mongoose.model("Candidate", CandidateSchema);

module.exports = Candidate;

//old Candidate model before I converted everything to strings
// const CandidateSchema = new Schema({
//     name: { type: String, required: true}, 
//     phone: {type: String, required: true},
//     email: String,
//     street: String,
//     city: String,
//     state: String,
//     zip: {
//         type: Number,
//          min:5
//     },
//     experience: String,
//     qualifications: [String],
//     commute: Number,
//     status: [String],
//     salary: String,
//     ranking: Number
// },
// {timestamps: true}
// )

