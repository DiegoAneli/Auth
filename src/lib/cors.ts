// /lib/cors.ts
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

const cors = Cors({
  methods: ['GET', 'HEAD', 'POST'],
  origin: 'http://localhost:3000', // Cambia questo con il tuo dominio
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: { (req: Cors.CorsRequest, res: { statusCode?: number | undefined; setHeader(key: string, value: string): any; end(): any; }, next: (err?: any) => any): void; (arg0: any, arg1: any, arg2: (result: any) => void): void; }) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors;
export { runMiddleware };
