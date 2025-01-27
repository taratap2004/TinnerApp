import { Component, inject, ViewChild } from '@angular/core'
import { User } from '../_models/user'
import { MatTabsModule } from '@angular/material/tabs'
import { AccountService } from '../_services/account.service'
import { FormsModule, NgForm } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'



@Component({
  selector: 'app-profile',
  imports: [MatTabsModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  accountService = inject(AccountService)
  user: User
  @ViewChild('form') form?: NgForm
  constructor() {
    this.user = this.accountService.data()!.user
  }
  onSubmit() {
    this.accountService.updateProfile(this.form!.value)
  }
}