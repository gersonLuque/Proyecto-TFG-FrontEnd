import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  if(req.url.includes('auth/login'))
    return next(req);

  const token = localStorage.getItem('token');
  if (token){
    const authReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`)
    })
    return next(authReq);
  }
  return next(req);
};
