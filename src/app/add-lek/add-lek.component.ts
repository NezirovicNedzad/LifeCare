import { DecimalPipe, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {FileUploader, FileUploadModule} from 'ng2-file-upload';
import { AccountService } from '../_services/account.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
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
private http=inject(HttpClient);
  uploader: FileUploader;
  photoPreview: string | null = null; 
  hasBaseDropZoneOver: boolean = false;
baseUrl=environment.apiUrl;
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
      idFarmaceuta:28
    });
    this.uploader = new FileUploader({
      url: '', // Will dynamically set the URL in the upload process
      allowedFileType: ['image'],
      autoUpload: false,
    });
    
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.generatePhotoPreview(file._file);
      console.log(file._file) // Generate preview
    };
  
  }
  
  ngOnInit(): void {
     this.uploader = new FileUploader({
      url: '', // Will dynamically set the URL in the upload process
      allowedFileType: ['image'],
      autoUpload: false,
    });
  }



  generatePhotoPreview(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.photoPreview = event.target.result;
    };
    reader.readAsDataURL(file);
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
    this.http.post(this.baseUrl+'lek', formData).subscribe({
      next: (response) => {
        alert('Lek successfully added!');
        console.log(response);
      },
      error: (err) => {
        console.error('Error adding lek:', err);
        alert('Failed to add lek. Please try again.');
      },
    });
  }
   
  
}
