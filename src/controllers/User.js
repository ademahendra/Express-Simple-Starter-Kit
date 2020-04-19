'use strict';
require('dotenv').config()
var response = require('../responses/index');
const DateFormat = require('../classes/DateFormat');
var nodemailer=require('nodemailer');
var models = require('../models');
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.users = async function(req, res) {
    models.User.findAll().then(function (users) {
        response.success(users, res)
    }).catch(function(err) {
        console.log(err)
    });
};

exports.index = function(req, res) {
    response.success("Hello from the Node JS RESTful side!", res);
};

exports.findUsers = function(req, res) {   
    var id = req.params.id;
    models.User.findOne(id).then(function (result) {
        response.success(result, res); 
    }).catch(function(err) {
        console.log(err)
        response.error(err, res)
    });
};

exports.login = function(req, res) {
    // find credential
    var username = req.body.username;
    var password = req.body.password;
    if(typeof username != 'undefined' && typeof password != 'undefined'){
        models.User.findOne({
            where: {
              [Op.or]: [
                { username: username },
                { email: username },
                { phone_number: username }
              ]
            }
          }).then(function (userDB) {
            bcrypt.compare(password, userDB.password_hash, function(err, result){
                if (!result) {
                    response.error('Invalid user or Password', res)
                } else {
                    const accessToken=jwt.sign({user:userDB},process.env.ACCESS_TOKEN,{expiresIn:  "5h",})
                    console.log('token : '+ accessToken);
                    var arr={'user':userDB,'status':result,'token': accessToken}
                    res.cookie('token', accessToken)
                    response.success(arr, res);
                }    
            }) ;
            }).catch(function(err) {
                console.log(err)
                response.error('Invalid user or Password', res)
            });
    } else {
        response.error('Invalid user or Password', res)
    }
};

exports.createUsers = function(req, res) {
    let date = new DateFormat().timestampNow();
    var username = req.body.username;
    var email = req.body.email;
    var passwordHash = bcrypt.hashSync(req.body.password,8);
    var phoneNumber = req.body.phone;
    var createAt=date;
    var updatedAt=date;
    var type=2;
    var status=0;
    var ip=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var authKey=bcrypt.hashSync(req.body.email,2)
    models.User.create({ 
        username: username, 
        email: email, 
        password_hash:passwordHash,
        phone_number:phoneNumber,
        registration_ip:ip,
        created_at:createAt,
        updated_at:updatedAt,
        status:status,
        type_user:type,
        auth_key:authKey
    }).then(async function (result) {
        console.log(process.env.EMAIL+' '+process.env.PASS_EMAIL)
        var transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASS_EMAIL
            },
            secure: true,
        });
            var host="http://localhost:3000";
            var textMessage='<h1>Registration Success<h1><br><p>Click this link to verify your account</p><p><a href="'+host+'/users/verification/'+email+'/'+ authKey +'">Verify Account</a></p>'
            console.log(process.env.FROM_NAME+' <'+process.env.EMAIL+'>');

            var mailOptions = {
                from: process.env.FROM_NAME+' <'+process.env.EMAIL+'>',
                to: username + '<'+email+'>',
                subject: 'Verify Account',
                html: textMessage
            };
            
            await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                response.error(error, res);
                console.log(error);
            } else {
                response.success(info, res);
                console.log('Email sent: ' + info);   
            }
        });
    }).catch(function(err) {
        console.log(err)
        response.error(err, res)
    });
};

exports.updateUsers = function(req, res) {
    let date = new DateFormat().timestampNow();
    var username = req.body.username;
    var email = req.body.email;
    var passwordHash = bcrypt.hashSync(req.body.password,8);
    var noTlp=req.body.phone;
    var updatedAt=date;
    var id = req.body.id;
    models.User.update({ 
        username: username,
        email: email, 
        password_hash:passwordHash,
        phone_number:noTlp,
        updated_at:updatedAt,
        }, {
        where: {
          id: id
        }
    }).then(function (result) {
        response.success("Berhasil merubah user!", res)
    }).catch(function(err) {
        console.log(err)
        response.error(err, res)
    });
};

exports.deleteUsers = function(req, res) {
    
    var user_id = req.body.user_id;
    models.User.destroy({
        where: {
          id: user_id
        }
      }).then(function (result) {
        response.success("Berhasil menghapus user!", res)
    }).catch(function(err) {
        console.log(err)
        response.error(err, res)
    });
};  

exports.verifyUser= function(req, res) {
    var key=req.params.key;
    var email=req.params.email;
    models.User.update({
        status:1,
        confirmed_at: new DateFormat().timestampNow()
    },{where:{
        email:email,
        auth_key:key
    }}).then(function (result) {
        models.User.findOne({
            where: {
                email:email
            }
        }).then(function (userDB) {
            const accessToken=jwt.sign({user:userDB},process.env.ACCESS_TOKEN,{expiresIn:  "5h",})
            var arr = {'success':'Succesfully verify user!','user':userDB,'token': accessToken}
            res.cookie('token', accessToken)
            response.success(arr, res);
        });
    }).catch(function(err) {
        console.log(err)
        response.error(err, res)
    });
};
