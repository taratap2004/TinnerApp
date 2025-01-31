import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../environments/environment'
import { default_paginator, Paginator, UserQueryPagination } from '../_models/pagination'
import { User } from '../_models/user'
import { cacheManager } from '../_helper/cache'
import { parseQuery } from '../_helper/helper'


type dataCategory = 'members' | 'follower' | 'following'
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private http = inject(HttpClient);
  private url = environment.baseUrl + 'api/'
  paginator = signal<Paginator<UserQueryPagination, User>>(default_paginator)

  private getData(category: dataCategory) {
    const pagination = this.paginator().pagination

    let key = cacheManager.createKey(pagination)
    const cacheData = cacheManager.load(key, category)
    if (cacheData) {
      console.log(`load ${category} from cache`)
      this.paginator.set(cacheData)
      return
    }

    console.log(`load ${category} from server`)
    const url = this.url + 'user/' + parseQuery(pagination)
    this.http.get<Paginator<UserQueryPagination, User>>(url).subscribe({
      next: response => {
        key = cacheManager.createKey(pagination)
        cacheManager.save(key, category, response)
        this.paginator.set(response)
      }
    })
  }
  getMembers() {
    this.getData('members')
  }
}