const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config_env')[env];

const loginSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
});

const registerSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
    name: Joi.string(),
    telephone: Joi.string(),
    specialty: Joi.string(),
    street: Joi.string(),
    city: Joi.string(),
    zipcode: Joi.string(),
    state: Joi.string()
});

module.exports = {
    async validateRequest (req, type){
        return new Promise(async (reject, resolve) => {
            try {
                let schema;
                if(type === 'login') schema = loginSchema;
                if(type === 'new') schema = registerSchema;
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
                    case 'name':
                        errorMessage = 'please provide a valid provider name';
                        break;
                    case 'email':
                        errorMessage = 'please provide valid email';
                        break;
                    case 'password':
                        errorMessage = 'please provide a valid password';
                        break;
                    default:
                        errorMessage = "Invalid credentials";
                        status = 500;
                }
                reject({message: errorMessage, status: status})
            }
        })
    },
    generateLoginResponse(user) {
        return new Promise((resolve, reject) => {
            let time = '12h';
            jwt.sign(user, config.jwt_secret, {expiresIn: time}, (err, token) => {
                if(err) reject(err);
                resolve({
                    user: {
                        name: user.name,
                    },
                    userId: user.id,
                    token: token
                })
            })
        })
    }
}