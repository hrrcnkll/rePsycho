const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    vk_id: { type: Number, required: true, unique: true },
    created_at: { type: Number },
    params: { type: Schema.Types.Mixed },
    results: { type: Schema.Types.Mixed }
}) 

module.exports = model('User', schema)