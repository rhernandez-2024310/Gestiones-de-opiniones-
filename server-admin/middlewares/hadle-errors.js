'use strict'

export const errorHandler = (err, req, res, next) => {
    console.error(`[Global Error]: ${err.stack}`)

    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: `Ya existe un registro con el dato: ${Object.keys(err.keyValue)}`
        })
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: 'Error de validación en la base de datos',
            errors: err.errors
        })
    }

    return res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Error interno del servidor'
    })
}