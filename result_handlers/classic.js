// Handler for classical (psychological) tests
module.exports = (passing) => {
    const result = {};
    const another = [];
    
    passing.answers.forEach(ans => {
        let is_another = false;

        ans.items.forEach(item => {
            if (typeof item.handler_info !== 'undefined') {
                item.handler_info.forEach(({ score, factor }) => {
                    result[factor] = Object.keys(result).includes(factor)
                        ? result[factor] + score
                        : score
                });
            }
            else {
                is_another = true;
            }
        });

        if (is_another) { another.push(ans) };
    });

    return [result, ...another];
}