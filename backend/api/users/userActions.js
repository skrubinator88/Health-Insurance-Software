const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config_env')[env];
const {SUPERUSER, ADMIN, BASIC} = require('./UserConstants');
const dbmain = require('../../config/DB/DBmain');
const loginSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
});

const newUserSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    role: Joi.string().required()
});

module.exports = {
    async validateRequest (req, type){
        return new Promise(async (reject, resolve) => {
            try {
                let schema;
                if(type === 'login') schema = loginSchema;
                if(type === 'new') schema = newUserSchema;
                const value = await schema.validateAsync(req.body);
                resolve(value)
            } catch(err) {
                let errorMessage;
                let status = 400;
                switch (err.details[0].context.key) {
                    case 'firstName':
                        errorMessage = 'please provide a valid first name';
                        break;
                    case 'lastName':
                        errorMessage = 'please provide a valid last name';
                        break;
                    case 'username':
                        errorMessage = 'please provide valid username';
                        break;
                    case 'password':
                        errorMessage = 'please provide a valid password';
                        break;
                    case 'role':
                        errorMessage = 'please select a role';
                        break;
                    default:
                        errorMessage = error;
                        status = 500;
                }
                reject({message: errorMessage, status: status})
            }
        })
    },
    generateLoginResponse(user) {
        return new Promise((resolve, reject) => {
            let time = '12h';
            time = user.role === SUPERUSER ? 60 * 30 : 60 * 60;
            jwt.sign(user, config.jwt_secret, {expiresIn: time}, (err, token) => {
                if(err) reject(err);
                resolve({
                    user: {
                        userRole: user.role,
                        name: user.name,
                    },
                    userId: user.id,
                    token: token
                })
            })
        })
    },
    async getUserRole(userId) {
        return new Promise(async (resolve, reject) => {
            const UserRole = dbmain.model('User_Role');
            const Role = dbmain.model('Role');
            let userRole = await UserRole.findOne({where: {UserId: userId}});
            let role = await Role.findOne({where: {id: userRole.RoleId}});
            resolve(role.name)
        })
    }
}