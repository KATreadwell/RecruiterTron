const mongooes = require("mongoose");
const Schema = mongoose.Schema;
const PositionSchema = new Schema({
    title: { type: String, required: true},
    category: {type: String, required: true}, 
    experience: {type: String, required: true},
    qualifications: {type: [String], required: true},
    status: {type: [String], required: true},
    salary: {type: String, required: true}
})

const Position = mongoose.model("Candidate", PositionSchema);

module.exports = {Position}
