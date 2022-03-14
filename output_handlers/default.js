// Default output handler
module.exports = (result) => {
    const processed = [{
        output: 'default',
        content: 'Спасибо за прохождение! Результаты появятся немного позже, а пока вы можете пройти другие наши тесты 😉'
    }];

    return processed;
}