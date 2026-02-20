'use strict';

import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'El texto de la publicación es obligatorio']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default model('Post', postSchema);