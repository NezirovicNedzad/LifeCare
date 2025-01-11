import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {FileUploader, FileUploadModule} from 'ng2-file-upload';
import { AccountService } from '../_services/account.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-lek',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule,NgFor,NgClass,FileUploadModule,DecimalPipe],
  templateUrl: './add-lek.component.html',
  styleUrl: './add-lek.component.css'
})
export class AddLekComponent implements OnInit {
  lekForm: FormGroup;
private accountService=inject(AccountService)
private toastr=inject(ToastrService)
private http=inject(HttpClient);
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean = false;
  imagePreviewUrl: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.lekForm = this.fb.group({
      naziv: ['', [Validators.required, Validators.minLength(3)]],
      opis: ['', [Validators.required, Validators.minLength(5)]],
      proizvodjac: ['', [Validators.required, Validators.minLength(3)]],
      datumIsteka: ['', Validators.required],
      naRecept: [false],
      cena: ['', [Validators.required, Validators.min(0)]],
      kolicina: ['', [Validators.required, Validators.min(1)]],
      photoUrl: ['nebitno'],
      photo: [null], 
      idFarmaceuta:this.accountService.currentUser()?.id
    });
    this.uploader = new FileUploader({
      url: '', // Will dynamically set the URL in the upload process
      allowedFileType: ['image'],
      autoUpload: false,
    });
  }
  ngOnInit(): void {
    this.uploader.onAfterAddingFile = (fileItem) => {
      this.generateImagePreview(fileItem._file);
    };
  }
  generateImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  clearImagePreview(): void {
    this.imagePreviewUrl = null;
    this.lekForm.reset();
    this.uploader.clearQueue();
  }
  
  fileOverBase(e:any)
  {
    this.hasBaseDropZoneOver=e;
  }
  
  onSubmit(): void {
    if (this.lekForm.invalid || this.uploader.queue.length<=0) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();

    // Append form fields
    Object.keys(this.lekForm.value).forEach((key) => {
      if (key === 'photo' && this.uploader.queue.length > 0) {
        // Add photo file
        formData.append('photo', this.uploader.queue[0]._file);
      } else {
        formData.append(key, this.lekForm.value[key]);
      }
    });

    // API Call
    this.http.post('https://nedzad6-001-site1.mtempurl.com/api/lek', formData).subscribe({
      next: (response) => {
        this.toastr.success("Uspesno ste dodali lek!");
        console.log(response);
        this.clearImagePreview();
      },
      error: (err) => {
        console.error('Error adding lek:', err);
        this.toastr.error("Niste dodali lek!");
      },
    });
  }
   
  
}
