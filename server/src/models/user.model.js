const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name : {
        firstName : {
            type: String,
            required: true
        },
        lastName : {
            type: String
        } 
    },
    email : {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    password : {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

UserSchema.pre('save', async function (next) {
    const user = this;

    if (!(user.isModified('password'))) {
        next();
    }

    try {
        const salt = await bcrypt.genSalt(12);

        const hashedPassword = await bcrypt.hash(user.password, salt);

        user.password = String(hashedPassword);
        next();
    } catch (error) {
        return next(error);
    }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        console.error(error);
    }
}

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;