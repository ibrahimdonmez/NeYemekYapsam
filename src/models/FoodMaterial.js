import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FoodMaterialSchema = new Schema({
    foodMaterial : {
        maxlength: 15,
        unique: true,
        type : String,
        required : [true, 'Lütfen Malzemeyi giriniz!']
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

export default mongoose.model('FoodMaterial', FoodMaterialSchema);