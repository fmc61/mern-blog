import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({

    email: {
        type: 'string',
        lowercase: true,
        unique: true,
        required: true,
        validate: [validator.isEmail, "please enter a valid email"]
    },

    username: {
        type: 'string',
        unique: true,
        required: true,

    },

    password: {
        type: 'string',
        required: true,
        select: false,
        validate: [
            {
                validator: value => validator.isStrongPassword(value),
                message: "Password must contain one or more alphanumeric characters and symbols"
            }
        ]
    }
},{
    timestamps: true
});


userSchema.pre("save", async function(next){
     
    if(!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

    next();
});

userSchema.methods.comparePassword = async function(givenPassword) {
  return await bcrypt.compare(givenPassword, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;
