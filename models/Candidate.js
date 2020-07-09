const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CandidateSchema = new Schema({
    name: { type: String, required: true}, 
    phone: {type: String, required: true},
    email: String,
    street: String,
    city: String,
    state: String,
    zip: {
        type: Number,
         min:5
    },
    experience: String,
    qualifications: [String],
    commute: Number,
    status: [String],
    salary: String,
    ranking: Number
},
{timestamps: true}
)

const Candidate = mongoose.model("Candidate", CandidateSchema);

module.exports = Candidate;
