const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    short_name: { type: String, required: true, unique: true },
    full_name: { type: String, required: true },
    options: { type: Schema.Types.Mixed },
    decoration: { type: Schema.Types.Mixed },
    questions: { type: Array }
}) 

module.exports = model('Test', schema)