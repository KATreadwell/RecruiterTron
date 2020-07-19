const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
    name: String, 
    phone: String,
    email: String,
    address: String,
    experience: String,
    qualifications: String,
    commute: String,
    status: String,
},
{timestamps: true}
)

const Candidate = mongoose.model("Candidate", CandidateSchema);

module.exports = Candidate;



