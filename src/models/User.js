import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : String,
    email : {
        type : String,
        unique : true,
        required : [true, 'Lütfen Email Adresi Giriniz!']
    },
    password : String,
    role : String,
    dateCreated : {
        type: Date,
        default: new Date()
    },
    dateModified : {
        type: Date,
        default: new Date()
    },
    lastLogin: {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model('User', UserSchema);