import Comment from './comment.model.js';

export const addComment = async (req, res) => {
    try {
        const { text, post } = req.body;
        const comment = new Comment({
            text,
            post,
            author: req.user.id 
        });
        await comment.save();
        res.status(201).json({ success: true, message: 'Comentario publicado', comment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ post: postId })
            .populate('author', 'username name')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, comments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const comment = await Comment.findById(id);

        if (!comment) return res.status(404).json({ success: false, message: 'No existe el comentario' });

        if (comment.author.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'No tienes permiso para editar este comentario' });
        }

        comment.text = text;
        await comment.save();
        res.status(200).json({ success: true, message: 'Comentario actualizado', comment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);

        if (!comment) return res.status(404).json({ success: false, message: 'No existe el comentario' });

        if (comment.author.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'No puedes borrar comentarios de otros' });
        }

        await Comment.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Comentario eliminado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};