const mongooes = require("mongoose");
const Schema = mongoose.Schema;
const PositionSchema = new Schema({
    title: { type: String, required: true},
    category: {type: String, required: true}, 
    experience: {type: String, required: true},
    qualifications: {type: [String], required: true},
    status: {type: [String], required: true},
    salary: {type: String, required: true},
    street: String,
    city: String,
    state: String,
    zip: {
        type: Number,
         min:5,
        max:5
    },
    location: String,
    client: String
})

const Position = mongoose.model("Candidate", PositionSchema);

module.exports = {Position}
