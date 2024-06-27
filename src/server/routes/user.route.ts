import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

const UserRoute = express.Router();

UserRoute.get(
    '/users',
    asyncHandler(async (req: Request, res: Response) => {
        res.send({
            users: [{ name: 'Arup' }],
        });
    }),
);

export default UserRoute;
