import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient } from '@angular/common/http';
import { JwtInterceptor } from './utils/jwt.interceptor';
import { routes } from './app.routes';
import { authInterceptProvider } from './utils/jwt.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    importProvidersFrom(HttpClient),
    provideHttpClient(),
    

  ]

};
