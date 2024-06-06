// next-connect.d.ts
import { NextApiRequest, NextApiResponse } from "next";
import { RequestHandler } from "express";

declare module "next-connect" {
  interface Options {
    onError?: (
      err: any,
      req: NextApiRequest,
      res: NextApiResponse,
      next: any
    ) => void;
    onNoMatch?: (req: NextApiRequest, res: NextApiResponse) => void;
  }

  interface NextConnect<TRequest, TResponse> {
    use(...handlers: RequestHandler<TRequest, TResponse>[]): this;
    get(handler: RequestHandler<TRequest, TResponse>): this;
    post(handler: RequestHandler<TRequest, TResponse>): this;
    handler: (req: TRequest, res: TResponse) => void;
  }

  function nextConnect<TRequest = NextApiRequest, TResponse = NextApiResponse>(
    options?: Options
  ): NextConnect<TRequest, TResponse>;

  export default nextConnect;
}
