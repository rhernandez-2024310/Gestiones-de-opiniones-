'use strict'

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { dbConnection } from './db.js';
import { corsOptions } from './cors.configuration.js';
import { helmetOptions } from './helmet.configuration.js';
import { requestLimit } from './rateLimit.configuration.js';
import { errorHandler } from '../middlewares/handle-errors.js';

import userRoutes from '../src/users/user.routes.js';
import postRoutes from '../src/posts/post.routes.js';
import commentRoutes from '../src/comments/comment.routes.js';
import fieldRoutes from '../src/fields/field.routes.js';

const BASE_PATH = '/kinalSports/v1';

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(cors(corsOptions));
    app.use(morgan('dev'));
    app.use(helmet(helmetOptions));
    app.use(requestLimit);
};

const routes = (app) => {
    app.use(`${BASE_PATH}/users`, userRoutes);
    app.use(`${BASE_PATH}/posts`, postRoutes);
    app.use(`${BASE_PATH}/comments`, commentRoutes);
    app.use(`${BASE_PATH}/fields`, fieldRoutes);

    app.use(`${BASE_PATH}/health`, (req, res) => {
        res.status(200).json({ status: 'healthy', service: 'Kinal Sports Admin Server' });
    });

    app.use((req, res) => {
        res.status(404).json({ success: false, message: 'Ruta no existe en el servidor' });
    });

    app.use(errorHandler);
};

export const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3021;
    app.set('trust proxy', 1);

    try {
        middlewares(app);
        await dbConnection();
        routes(app);
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
    } catch (err) {
        console.error(`Server init failed: ${err}`);
    }
};