import { inject, Injectable } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingRequestCount = 0

  private spinner = inject(NgxSpinnerService)
  constructor() { }

  loading() {
    this.loadingRequestCount++
    this.spinner.show(undefined, {
      type: "pacman",
      bdColor: "rgba(0, 0, 0, 0.8)",
      color: "#fff300",
      fullScreen: false
    })
  }

  idle() {
    this.loadingRequestCount--
    if (this.loadingRequestCount <= 0) {
      this.loadingRequestCount = 0
      this.spinner.hide()
    }
  }
}
