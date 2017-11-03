import * as Mongoose from 'mongoose';
import * as Bcrypt from 'bcryptjs';

export interface IUser extends Mongoose.Document {
    name: string;
    email: string;
    phone: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    validatePassword(pass: string): boolean;
}


export const UserSchema = new Mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 100
        },
        email: {
            type: String,
            unique: true,
            required: true,
            maxlength: 50
        },
        phone: String,
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// hashing user's password
function hashPass(pass: string): string {
    if (!pass) {
        return null;
    }

    return Bcrypt.hashSync(pass, Bcrypt.genSaltSync(8));
}

// validating user's password 
UserSchema.methods.validatePassword = function(pass: string) {
    return Bcrypt.compareSync(pass, this.password);
};

// Before executing the 'save' method, we 
// rehashing password if it changed
UserSchema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    user.password = hashPass(user.password);

    return next();
});

// Before executing the 'findOneAndUpdate' method,
// we get a new user's password, hashing it and save then.
UserSchema.pre('findOneAndUpdate', function() {
    const pass = hashPass(this.getUpdate().$set.password);

    if (!pass) {
        return;
    }

    this.findOneAndUpdate({}, { password: pass });
});

export const UserModel = Mongoose.model<IUser>('User', UserSchema);