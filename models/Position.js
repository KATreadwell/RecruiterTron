const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PositionSchema = new Schema({
    title: String,
    experience: String,
    qualifications: String,
    status: String,
    location: String,
    client: String,
    priority: String,
    req: String
}, {timestamps: true}
)

const Position = mongoose.model("Position", PositionSchema);

module.exports = Position;


