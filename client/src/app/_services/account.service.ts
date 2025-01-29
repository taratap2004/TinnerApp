import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { User } from '../_models/user'
import { firstValueFrom } from 'rxjs'
import { parseUserPhoto } from '../_helper/helper'
import { Photo } from '../_models/photo'

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _key = 'account';
  private _baseApiUrl = environment.baseUrl + 'api/account/'
  private _http = inject(HttpClient)

  data = signal<{ user: User, token: string } | null>(null)

  constructor() {
    this.loadDataFromLocalStorage()
  }
  //#region login_and_register
  logout() {
    localStorage.removeItem(this._key)
    this.data.set(null)
  }

  async login(loginData: { username: string, password: string }): Promise<string> {
    try {
      const url = this._baseApiUrl + 'login'
      const response = this._http.post<{ user: User, token: string }>(url, loginData)
      const data = await firstValueFrom(response)
      data.user = parseUserPhoto(data.user)
      this.data.set(data)
      this.saveDataToLocalStorage()
      return ''
    } catch (error: any) {
      return error.error?.message
    }
  }

  //#endregion

  //#region localstorage
  async register(registerData: User): Promise<string> {
    try {
      const url = this._baseApiUrl + 'register'
      const response = this._http.post<{ user: User, token: string }>(url, registerData)
      const data = await firstValueFrom(response)
      data.user = parseUserPhoto(data.user)
      this.data.set(data)
      this.saveDataToLocalStorage()
      return ''
    } catch (error: any) {
      return error.error?.message
    }
  }

  private saveDataToLocalStorage() {
    const jsonString = JSON.stringify(this.data())
    localStorage.setItem(this._key, jsonString)
  }

  private loadDataFromLocalStorage() {
    const jsonString = localStorage.getItem(this._key)
    if (jsonString) {
      const data = JSON.parse(jsonString)
      this.data.set(data)
    }
  }

  //#endregion

  //#region profile
  async updateProfile(user: User): Promise<boolean> {
    const url = environment.baseUrl + 'api/user/'
    try {
      const response = this._http.patch(url, user)
      await firstValueFrom(response)
      const currentData = this.data()
      if (currentData) {
        currentData.user = user
        this.data.set(currentData)
        this.saveDataToLocalStorage()
      }

    } catch (error) {
      return false


    }
    return true

  }
  //#endregion

  //#region upload photo
  async setAvatar(photo_id: string): Promise<void> {
    const url = environment.baseUrl + 'api/photo/' + photo_id
    try {
      const response = this._http.patch(url, {})
      await firstValueFrom(response)
      const user = this.data()!.user
      if (user) {
        const photos = user.photos?.map(p => {
          p.is_avartar = p.id === photo_id
          return p
        })
        user.photos = photos
        const copyData = this.data()
        if (copyData)
          copyData.user = user
        this.data.set(copyData)
        this.saveDataToLocalStorage()
      }
    } catch (error) {

    }
  }
  async deletePhoto(photo_id: string): Promise<void> {
    const url = environment.baseUrl + 'api/photo/' + photo_id
    try {
      const response = this._http.delete(url)
      await firstValueFrom(response)
      const user = this.data()!.user
      if (user) {
        const photos = user.photos?.filter(p => p.id !== photo_id)
        user.photos = photos
        const copyData = this.data()
        if (copyData)
          copyData.user = user
        this.data.set(copyData)
        this.saveDataToLocalStorage()
      }
    } catch (error) {

    }
  }

  async uploadPhoto(file: File): Promise<boolean> {
    const url = environment.baseUrl + 'api/photo'
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = this._http.post<Photo>(url, formData)
      const photo = await firstValueFrom(response)
      const user = this.data()!.user

      if (user) {
        if (!user.photos)
          user.photos = []
        user.photos.push(photo)
        //upddate user data in local-storage
        const copyData = this.data()
        if (copyData)
          copyData.user = user
        this.data.set(copyData)
        this.saveDataToLocalStorage()
        return true
      }

    } catch (error) {

    }
    return false
  }
  //#endregion
}
