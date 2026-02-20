import Field from './field.model.js';

export const createField = async (req, res) => {
    try {
        const data = req.body;
        
        if (req.file) {
            data.image = req.file.path; 
        }

        const field = new Field(data);
        await field.save();

        res.status(201).json({ success: true, message: 'Cancha creada exitosamente', field });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear la cancha', error: error.message });
    }
};

export const getFields = async (req, res) => {
    try {
        const fields = await Field.find({ status: true });
        res.status(200).json({ success: true, fields });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const updateField = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (req.file) {
            data.image = req.file.path;
        }

        const updatedField = await Field.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json({ success: true, message: 'Cancha actualizada', updatedField });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};