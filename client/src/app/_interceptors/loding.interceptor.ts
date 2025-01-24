import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { LoadingService } from '../_services/loading.service'
import { delay, finalize } from 'rxjs'

export const lodingInterceptor: HttpInterceptorFn = (req, next) => {
  const lodingService = inject(LoadingService)
  lodingService.loading()
  return next(req).pipe(
    delay(1000),
    finalize(() => { lodingService.idle() })
  )
}
