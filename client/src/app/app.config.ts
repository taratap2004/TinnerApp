import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { NgxSpinnerModule } from 'ngx-spinner'
import { lodingInterceptor } from './_interceptors/loding.interceptor'
import { errorInterceptor } from './_interceptors/error.interceptor'
import { jwtInterceptor } from './_interceptors/jwt.interceptor'

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideAnimationsAsync(),
  provideHttpClient(withInterceptors([lodingInterceptor, errorInterceptor, jwtInterceptor])),
  importProvidersFrom(NgxSpinnerModule),
  ]
}
