const User = require('../models/user');

const generateKey = function(){
    let arr = [...Array(30)];
    return arr.map(function(item){
        return (Math.random() * 36 | 0).toString(36);
    }).join('');
}

const validateKey = async function(req, res, next){
    let host = req.headers.host;
    let apiKey = req.get('x-api-key');
    let account = await User.findOne({host: host, api_key: apiKey});

    if(account){
        let response = await updateUser(account);
        if(response.ok){
            next();
        }
        else{
            next(response.err);
        }
    }
    else{
        res.status(403).send({error: {code: 403, message: "Access Denied."}});
    }
}

const updateUser = async function(account){
    let timestamp = Date.now();
    let requestCount = account.usage.requests + 1;

    try{
        let res = await User.updateOne({_id: account.id}, {usage: {requests: requestCount, lastAccessTime: timestamp}});
        return res;
    }
    catch (err){
        return {respose: { err }}
    }
}


module.exports = {
    generateKey,
    validateKey
}