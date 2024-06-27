import express, { Request, Response } from 'express';

const CounterRoute = express.Router();

const sendAndSleep = function (res: Response, counter: number) {
    if (counter > 10) {
        res.end();
    } else {
        res.write(' ;i=' + counter);
        counter++;
        setTimeout(function () {
            sendAndSleep(res, counter);
        }, 1000);
    }
};

CounterRoute.get('/counter', async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    res.write('Thinking...');
    sendAndSleep(res, 1);
});

export default CounterRoute;
