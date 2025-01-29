import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { fileTypeFromBlob } from 'file-type/core'
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-upload-photo',
  imports: [MatDialogActions, MatDialogContent, MatDialogTitle, CommonModule, MatButtonModule],
  templateUrl: './upload-photo.component.html',
  styleUrl: './upload-photo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadPhotoComponent {
  acceptedTmageType = ['image/jpeg', 'image/png']
  imgFile: File | undefined
  imgPreview = signal<undefined | string>(undefined)
  errMessage = signal<undefined | string>(undefined)
  private readonly dialogRef = inject(MatDialogRef<UploadPhotoComponent>)

  onSubmit() {
    this.dialogRef.close(this.imgFile)
  }
  async onImgPicked(event: Event) {
    this.imgPreview.set(undefined)
    this.errMessage.set(undefined)
    this.imgFile = undefined
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.imgFile = input.files[0]
      const fileType = await fileTypeFromBlob(this.imgFile)
      if (fileType && this.acceptedTmageType.includes(fileType.mime)) {
        const fileReader = new FileReader()
        fileReader.onload = () => {
          this.imgPreview.set(fileReader.result as string)
        }
        fileReader.readAsDataURL(this.imgFile)
      } else {
        this.imgFile = undefined
        this.errMessage.set('Image must be .jpg or .png')
      }
    }
  }
}