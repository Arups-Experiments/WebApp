import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';

export const combinedMiddlewares = (app: express.Application) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(logger('dev'));
    app.use(compression({ algorithm: 'gzip' }));
    app.use(helmet({ xXssProtection: false }));
    app.use(cors());
    app.options('*', cors());
};
