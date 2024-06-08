import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  // const server = 'https://snapmymoney-rest-api-production.up.railway.app/api'; // Put your server's url here
  const server = 'http://localhost:3000/api'; // Put your server's url here
    const reqClone = req.clone({ url: `${server}/${req.url}` });
  return next(reqClone);
};