// Default handler (saves the given answers as a result)
module.exports = (passing) => {
    const result = [];
    
    passing.answers.map(item => {
        delete item.state;
        result.push(item);
    });

    return result;
}