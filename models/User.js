const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email.'] 
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password minimum length is 6 characters'],
    },
});

// fire a function after doc saved to db
userSchema.post('save', function (doc, next) {
    console.log('new user was created & saved', doc);
  next();  
});

// fire a function before doc saved to db
userSchema.pre('save', async function (next){
    console.log('user about to be created and save', this);
    const salt = bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;