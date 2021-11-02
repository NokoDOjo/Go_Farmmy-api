const ajvInstance = require('./ajv-instance')

const signUpSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', maxLength: 20, minLength: 1 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 1 },
    checkPassword: { const: { $data: '1/password' } },
  },
  required: ['name', 'email', 'password', 'checkPassword'],
  additionalProperties: false,
}

const signInSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 1 },
  },
  required: ['email', 'password'],
  additionalProperties: false
}

const userSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', maxLength: 20, minLength: 1 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 1 },
    newPassword: { type: 'string', minLength: 1 }
  }
}

const orderSchema = {
  type: 'object',
  properties: {
    customerName: { type: 'string', maxLength: 20, minLength: 1 },
    customerEmail: { type: 'string', format: 'email' },
    customerPhone: { type: 'string', maxLength: 10 },
    recipientName: { type: 'string', maxLength: 20, minLength: 1 },
    recipientEmail: { type: 'string', format: 'email' },
    recipientPhone: { type: 'string', maxLength: 10 },
    recipientAddress: { type: 'string', maxLength: 50 }
  },
  required: ['customerName', 'customerEmail', 'customerPhone', 'recipientName', 'recipientEmail', 'recipientPhone'],
  additionalProperties: false
}

const signUp = ajvInstance.compile(signUpSchema)
const signIn = ajvInstance.compile(signInSchema)
const user = ajvInstance.compile(userSchema)
const order = ajvInstance.compile(orderSchema)

module.exports = { signUp, signIn, user, order }