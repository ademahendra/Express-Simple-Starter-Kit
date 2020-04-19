'use strict';
const jwt = require('jsonwebtoken');
var response = require('../responses/index');
const verifyToken = (req, res, next) => {
    const bearerHeader=req.headers['authorization'];
    if(typeof bearerHeader !=='undefined'){
            const bearer=bearerHeader.split(' ');
            const bearerToken=bearer[1];
            var token = bearerToken;
    }else{
        response.forbidden('Forbidden', res)
    }
    jwt.verify(token,process.env.ACCESS_TOKEN, (err,authData)=>{
        if(err){
            response.forbidden('Forbidden', res)
        }else{
            req.userAuth=authData.user;
            next();
        }
    })
};
module.exports = {
    verifyToken
}