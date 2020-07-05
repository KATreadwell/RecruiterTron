const mongooes = require("mongoose");
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
         min:5,
          max:5
    },
    experience: String,
    qualifications: [String],
    commute: String,
    status: [String],
    salary: String
})

const Candidate = mongoose.model("Candidate", CandidateSchema);

module.exports = {Candidate}
