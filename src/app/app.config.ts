import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {providePrimeNG} from 'primeng/config';
import {ConfirmationService, MessageService} from 'primeng/api';
import Aura from '@primeng/themes/aura';
import {HIGHLIGHTJS_CONFIG, HighlightJsConfig, provideSFConfig} from 'ngx-highlight-js';
import {tokenInterceptor} from '@core/interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideSFConfig({ lang: 'html' }),
    provideAnimationsAsync(),
    providePrimeNG({
      theme:{
        preset:Aura,
        options: {
          darkModeSelector : false
        }
      }
    }),
    MessageService,
    ConfirmationService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withComponentInputBinding()),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    ]
};
