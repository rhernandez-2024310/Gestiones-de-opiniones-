'use strict'

export const deleteFileOnError = (err, req, res, next) => {
    if (req.file) {
        console.log('Error detectado, eliminando archivo subido...')
    }
    next(err)
}