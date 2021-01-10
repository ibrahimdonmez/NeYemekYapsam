import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    foodName : {
        type : String,
        unique : true,
        required : [true, 'Lütfen yemek adı giriniz!']
    },
    category : {
        type : String,
        required : [true, 'Lütfen yemeğin kategorisini giriniz!']
    },
    calories : {
        type : String,
        required : [true, 'Lütfen yemeğin kalorisini giriniz!']
    },
    time : {
        type : String,
        required : [true, 'Lütfen yemeğin hazırlanma süresini giriniz!']
    },
    image : {
        type : String,
        required : [true, 'Lütfen yemeğin resim urlini giriniz!']
    },
    portion : {
        type : String,
        required : [true, 'Lütfen yemeğin porsiyonunu giriniz!']
    },
    recipe : {
        type : String,
        required : [true, 'Lütfen yemeğin tarifini giriniz!']
    },
    materials : {
        type : Array,
        required : [true, 'Lütfen yemeğin malzemelerini giriniz!']
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

export default mongoose.model('Food', FoodSchema);