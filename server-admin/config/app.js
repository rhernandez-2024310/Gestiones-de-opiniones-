import postRoutes from '../src/posts/post.routes.js';

const routes = (app) => {
    app.use(`${BASE_PATH}/users`, userRoutes);
    app.use(`${BASE_PATH}/posts`, postRoutes); 
    app.use(`${BASE_PATH}/fields`, fieldRoutes);
};