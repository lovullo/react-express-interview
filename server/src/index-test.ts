import {expect} from 'chai';
import {Request, Response} from 'express';
import {main} from './index';

describe('main function', () => {
  it('should respond with status 200 and message', async () => {
    const req = {} as Request;
    const res = {
      status: function (statusCode: number) {
        expect(statusCode).to.equal(200);
        return this;
      },
      send: function (message: string) {
        expect(message).to.equal('{ "text": "Important Payment System"}');
      },
      set: () => {},
    } as unknown as Response;

    await main(req, res);
  });
});
