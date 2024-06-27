import express, { Request, Response, Application, NextFunction } from 'express';
import { UserRoute, CounterRoute } from './routes';
import httpStatus from 'http-status';
import { combinedMiddlewares } from './middlewares';
import envFileMapping from '../config';
import dotenv from 'dotenv';
import { IError } from './utils/ApiErrors';

function loadEnvFile(envFile: string) {
    dotenv.config({ path: envFile });
}

const app = express();

const PORT = 3000;

type envType = 'development' | 'production';

const environment = process.env.NODE_ENV || 'development';

// Load the appropriate .env file
const envFile = envFileMapping[environment as envType];

if (envFile) {
    loadEnvFile(envFile);
} else {
    throw new Error(`Unrecognized environment: ${environment}`);
}

const initServer = (appInstance: Application) => {
    // Apply combined middlewares
    combinedMiddlewares(appInstance);

    const errorHandler = (
        err: IError,
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        console.error(err);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
            errors: [{ message: 'Something went wrong' }],
        });
    };

    appInstance.use('/v1', UserRoute);
    appInstance.use('/v1', CounterRoute);

    appInstance.get('/', async (req: Request, res: Response) => {
        res.set('Cache-Control', 'public, max-age=31557600').send(
            'I am Alive!!',
        );
    });

    // send back a 404 error for any unknown api request
    appInstance.all('*', (req: Request, res: Response, next: NextFunction) => {
        const error = new Error('no such route');
        next(error);
    });

    appInstance.use(errorHandler);

    appInstance.listen(PORT, async () => {
        console.log(`Server running at the Port ${PORT}`);
    });
};

initServer(app);
