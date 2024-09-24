import mongoose from "mongoose";

const {Schema} = mongoose;

const postSchema = new Schema({
    title : {
        type: 'string',
        required: true
    },
    content: {
        type: 'string',
        required: true,
        validate: [value => value.length < 500, 'content should be up to 500 characters long'] 
    },
    image:{
        type: 'string',
        default: null,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

const Post = mongoose.model('Post', postSchema);

export default Post;