var generateMessage = (from, text)=>{
    return {
        from,
        text,
        createdAt: new Date().getTime()
    }
};

var generateLocationMessage = (from, lat, lon)=>{
    return {
        from: from,
        url: `http://www.google.com/maps?q=${lat},${lon}`,
        createdAt: new Date().getTime()
    }
};

module.exports = {generateMessage, generateLocationMessage};