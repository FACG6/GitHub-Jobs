const request = require('request');
const makeRequest = (data, callback) => {
    const description = data.split(',')[0];
    const location = data.split(',')[1];
    const option = {
        url: `https://jobs.github.com/positions.json?description=${description}&location=${location}`,
        method: 'GET',
    }
    request(option, (err, res) => {
        if(err){
            callback(err);
            return;
        }
        if(res.statusCode !== 200){
            callback(res.statusCode);
            return;
        }
        if(!res.headers["content-type"].includes('application/json')){
            callback(`content type is not json`);
            return;
        }
        callback(null, res.body);
    })

}

module.exports = makeRequest;


