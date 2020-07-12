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
    // ranking: String,
    // photo: ?
},
{timestamps: true}
)

const Candidate = mongoose.model("Candidate", CandidateSchema);

module.exports = Candidate;
