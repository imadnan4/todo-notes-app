import mongoose from "mongoose";



const noteSchema = new mongoose.Schema({
        title :{
            type: String,
            required : [true, "Title is required"],
            trim : true,
            maxlength : [100, 'Title is too long']
        },

        content : {
            type : String,
            trim: true,
            default: '',
        },

        tags :{
            type: [String],
            default: []
        },

        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required : true,
        },
    },
        {timestamps : true}
)

export default mongoose.model('Note', noteSchema)