import Post from './post.model.js';

// 1. Crear publicación
export const createPost = async (req, res) => {
    try {
        const data = req.body;
        data.author = req.user.id; // Obtenemos el ID del token (validateJWT)

        const post = new Post(data);
        await post.save();

        res.status(201).json({ success: true, message: 'Publicación creada', post });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear post', error: error.message });
    }
};

// 2. Listar todas
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name username') // Muestra info del autor
            .sort({ createdAt: -1 }); // Más recientes primero
        res.status(200).json({ success: true, posts });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 3. Obtener por ID
export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate('author', 'name username');
        if (!post) return res.status(404).json({ success: false, message: 'Post no encontrado' });
        res.status(200).json({ success: true, post });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 4. Editar (Solo el autor puede hacerlo)
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ success: false, message: 'Post no encontrado' });

        // Verificamos si el usuario del token es el mismo que el autor del post
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'No tienes permiso para editar esta publicación' });
        }

        const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ success: true, message: 'Publicación actualizada', updatedPost });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// 5. Eliminar (Solo el autor puede hacerlo)
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) return res.status(404).json({ success: false, message: 'Post no encontrado' });

        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'No puedes eliminar un post ajeno' });
        }

        await Post.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Publicación eliminada' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};