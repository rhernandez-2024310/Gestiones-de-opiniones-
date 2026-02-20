'use strict';

import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
    text: {
        type: String,
        required: [true, 'El texto del comentario es obligatorio'],
        trim: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'El comentario debe pertenecer a un post']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export default model('Comment', commentSchema);