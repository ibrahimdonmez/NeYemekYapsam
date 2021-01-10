import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    foodID : {
        type : String,
        required : [true, 'Yemek Bulunamadı!']
    },
    userName : {
        type : String,
        required : [true, 'Kullanıcı Bulunamadı!']
    },
    Comment : {
        type : String,
        required : [true, 'Lütfen yorum giriniz!']
    },
    dateCreated : {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model('Comment', CommentSchema);