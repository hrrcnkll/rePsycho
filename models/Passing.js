const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    vk_id: { type: Number, required: true },
    test_short_name: { type: String, required: true },
    status: { type: String },
    answers: { type: Array }
}) 

module.exports = model('Passing', schema)