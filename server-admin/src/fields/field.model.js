'use strict';

import { Schema, model } from 'mongoose';

const fieldSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la cancha es obligatorio'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    location: {
        type: String,
        required: [true, 'La ubicación es obligatoria']
    },
    price: {
        type: Number,
        required: [true, 'El precio por hora es obligatorio']
    },
    image: {
        type: String 
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default model('Field', fieldSchema);