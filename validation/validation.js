import joi from 'joi';
//register validation
const registerValidation = data =>{
    const schema=joi.object({
        name:joi.string()
        .min(6).
        required(),
        email:joi.string()
        .min(6)
        .required()
        .email(),
        password:joi.string()
        .required()
        .min(6)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });

    return schema.validate(data);
};

const loginValidation = data =>{
    const schema=joi.object({
        email:joi.string()
        .min(6)
        .required()
        .email(),
        password:joi.string()
        .required()
        .min(6)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    });

    return schema.validate(data);
};

export {registerValidation,loginValidation} 

