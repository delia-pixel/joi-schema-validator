const Joi = require('joi');

const ageSchema= Joi.alternatives().try([
    Joi.number().integer().greater(6).required(),
    Joi.string().replace(/^([7-9]|[1-9]\d+)(y|yr|yrs)?$/i, '$1').required()
]);

const name= Joi.string().regex(/^[A-Z]+$/).uppercase();

const personDataSchema= Joi.object().keys({
    id: Joi.string().guid({version: "uuidv4"}).required(),
    firstname: name,
    lastname: name,
    fullname: Joi.string().regex(/^[A-Z]+ [A-Z]+$/i).uppercase(),
    type: Joi.string().valid('STUDENT', 'TEACHER').uppercase().required(),
    age: Joi.when('type',{
        is: 'STUDENT',
        then: ageSchema.required(),
        otherwise: ageSchema
    })
}).xor('firstname', 'fullname')
.and('firstname', 'lastname')
.without('fullname', ['firstname','lastname']);

const authDataSchema = Joi.object({
    teacherId: Joi.string().guid({version: "uuidv4"}).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().max(7).required().strict(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict()
});

const feesDataSchema = Joi.object({
    studentId: Joi.string().guid({version:'uuidv4'}).required(),
    amount: Joi.number().positive().greater(1).precision(2).required(),
    cardNumber: Joi.string().creditCard().required(),
    completedAt: Joi.date().timestamp().required()
})

module.exports ={
    '/people': personDataSchema,
    '/auth/edit': authDataSchema,
    '/fees/pay': feesDataSchema
}