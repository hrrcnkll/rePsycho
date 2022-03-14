const dateConverter = (date) => {
    const _date = new Date(date);

    const conv = {
        utc: date,
        day: ('0' + _date.getDate()).slice(-2),
        month: ('0' + (_date.getMonth() + 1)).slice(-2),
        year: _date.getFullYear(),
        hour: ('0' + (_date.getHours())).slice(-2),
        minute: ('0' + (_date.getMinutes())).slice(-2),
        second: ('0' + (_date.getSeconds())).slice(-2),
    };

    conv.DMY = `${conv.day}.${conv.month}.${conv.year}`;
    conv.HM = `${conv.hour}:${conv.minute}`;

    return conv;
};

export default dateConverter;