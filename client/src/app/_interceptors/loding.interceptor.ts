import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { LoadingService } from '../_services/loading.service'
import { delay, finalize } from 'rxjs'

export const lodingInterceptor: HttpInterceptorFn = (req, next) => {
  const lodingService = inject(LoadingService)

  if (req.url.includes('/api/like/')) return next(req)
  lodingService.loading()
  return next(req).pipe(
    delay(500),
    finalize(() => {
      lodingService.idle()
    })
  )
}
