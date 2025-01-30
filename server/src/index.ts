import type { Request, Response } from 'express';

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
  console.log('Received request:', req.method, req.url);
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // stop preflight requests here
    res.status(204).send('');
    return;
  }

  if (req.method === 'POST') {
    return handlePayment(req, res);
  }

  res.status(StatusCodes.OK).send('{ "text": "Important Payment System"}');
};


/**
 * Handle a payment request
 *
 * @param req - The Node Express request object.
 * @param res - The Node Express response object.
 */
const handlePayment = async (req: Request, res: Response) => {
  try {
    const { payment } = req.body;
    console.log('Payment received:', payment);

    res.status(StatusCodes.OK).send('{ "payment": "success" }');
  } catch (error) {
    console.error('Error handling payment:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send('{ "payment": "error" }');
  }
};