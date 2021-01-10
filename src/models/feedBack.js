import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const feedBackSchema = new Schema({
    name : {
        type : String,
        required : [true, 'Lütfen isminizi giriniz!']
    },
    mail : {
        type : String,
        required : [true, 'Lütfen mail adresinizi giriniz!']
    },
    message : {
        type : String,
        required : [true, 'Lütfen mesajı giriniz!']
    },
    dateCreated : {
        type: Date,
        default: new Date()
    },
    dateModified : {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model('feedBack', feedBackSchema);