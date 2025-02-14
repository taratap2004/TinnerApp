import { Component, inject, OnInit } from '@angular/core'
import { User } from '../../_models/user'
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery'
import { MemberService } from '../../_services/memder.service'
import { Photo } from '../../_models/photo'
import { ActivatedRoute, Router } from '@angular/router'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-member-profile',
  imports: [GalleryModule, MatSidenavModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './member-profile.component.html',
  styleUrl: './member-profile.component.scss'
})
export class MemberProfileComponent implements OnInit {
  member!: User
  images: GalleryItem[] = []
  memberService = inject(MemberService)
  activeRoute = inject(ActivatedRoute)
  router = inject(Router)

  private initGalleryItem(photos: Photo[]) {
    for (const photo of photos) {
      this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }))
    }
  }

  async getMember() {
    const username = this.activeRoute.snapshot.paramMap.get('username')
    if (!username) return
    const member = await this.memberService.getMemberByUsername(username)
    if (!member) {
      this.router.navigate(['404'])
    } else {
      this.member = member
      if (member.photos)
        this.initGalleryItem(member.photos)
    }
  }

  ngOnInit(): void {
    this.getMember()
  }
}
