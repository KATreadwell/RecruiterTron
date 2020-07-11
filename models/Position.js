const mongoose = require("mongoose");
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
         min: 5,
    },
    location: String,
    client: String,
    priority: [String],
    // logo: ?
})

const Position = mongoose.model("Position", PositionSchema);

module.exports = Position;
