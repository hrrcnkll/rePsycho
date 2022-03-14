const { Router } = require('express');
const User = require('../models/User');
const router = Router();

const encoder = require('../service/encoder');

// /api/users
router.get('/', async (request, response) => {
    try {
        // Launch parameter signature validation
        const auth_info = encoder(request.header('Authorization'));

        // If launch parameters are valid
        if (auth_info.status) {
            const vk_id = auth_info.vk_user_id;
            const candidate = await User.findOne({ vk_id }, { _id: 0, results: 0, __v: 0 });
            const params = {
                scheme: 'bright_light',
                has_progressbar: true,
                has_initial_instruction: true
            };

            if (!candidate) {
                const info = { vk_id, created_at: Date.now(), params, results: [] };
                const user = new User(info);
                await user.save();
                response.json(info);
            }
            else {
                response.json(candidate);
            }
        }
        // If launch parameters are invalid
        else {
            response.json({ error: 'Параметры запуска недействительны!' });
        }
    } 
    catch (e) {
        response.status(500).json({ message: 'API Error (users): Что-то пошло не так. Попробуйте снова...' })
    }
})

// /api/users/save_settings
router.post('/save_settings', async (request, response) => {
    try {
        // Launch parameter signature validation
        const auth_info = encoder(request.header('Authorization'));

        // If launch parameters are valid
        if (auth_info.status) {
            const vk_id = auth_info.vk_user_id;
            const user = await User.findOne({ vk_id });
            const _params = { ...user.params };

            // Updating user settings (params)
            Object.keys(request.body).forEach(prop => {
                if (prop in _params) {
                    _params[prop] = request.body[prop];
                }
            });
            user.params = _params;
            await user.save();

            response.status(201).json({ message: 'Новые настройки сохранены' });
        }
        else {
            response.json({ error: 'Параметры запуска недействительны!' });
        }
    } 
    catch (e) {
        response.status(500).json({ message: 'API Error (users/save_settings): Что-то пошло не так. Попробуйте снова...' })
    }
})

module.exports = router;