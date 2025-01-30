import type {Request, Response} from 'express';

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

enum StatusCodes {
  OK = 200,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
}

/**
 * Invoke an API Request function
 *
 * @param req - The Node Express request object.
 * @param res - The Node Express response object.
 */
export const main = async (req: Request, res: Response) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');

  if (req.method === 'OPTIONS') {
    // stop preflight requests here
    res.status(204).send('');
    return;
  }

  res.status(StatusCodes.OK).send('{ "text": "Important Payment System"}');
};
