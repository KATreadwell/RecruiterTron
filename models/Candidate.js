const mongoose = require("mongoose");
const { boolean } = require("joi");
const Schema = mongoose.Schema;
const CandidateSchema = new Schema({
    name: { type: String, required: true}, 
    phone: {type: Number, required: true},
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
    salary: String
},
{timestamps: true}
)

const Candidate = mongoose.model("Candidate", CandidateSchema);

module.exports = Candidate;
