import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
// Firebase
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';


// Material
import { MatDialogRef } from '@angular/material/dialog';

// Models
import { Post } from 'src/app/models/post';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  uploadPercentFile: Observable<number | undefined>;
  uploadPercentPreview: Observable<number | undefined>;
  downloadURL: Observable<string>;
  formPost: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UploadComponent>,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    public fb: FormBuilder,
    private utilService: UtilsService,
  ) { }

  ngOnInit(): void {
    this.formPost = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      file: ['', Validators.required],
      preview: ['', Validators.required],
      date: [new Date().toLocaleString()],
    })
  }

  /**
   * Upload File
   * @param event 
   */
  uploadFile(event: any) {
    const file = event.target.files[0];
    const filePath = file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercentFile = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe( url => {
          this.formPost.patchValue({ file: url })
        })

      })
    ).subscribe()
  }

  /**
   * Upload Preview
   * @param event 
   */
  uploadPreview(event: any) {
    const file = event.target.files[0];
    const filePath = file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercentPreview = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => { 
        fileRef.getDownloadURL().subscribe( url => {
          this.formPost.patchValue({ preview: url })
        })
      })
    ).subscribe()
  }

  /**
   * uploadPost($event)
   */
  public uploadPost(event: any): any {
    console.log(this.formPost.value);
    let end: string = this.formPost.value.description
    
    if (this.formPost.valid && end.endsWith('da2.')) {
      this.firestore.collection('posts').add(this.formPost.value).then(
        () => {
          console.log("DONE")
          this.dialogRef.close()
        }
      )
    }
    else{
      console.error("Left Files");
      
    }
  }

}
