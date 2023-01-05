import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

// Firebase
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

// Models
import { Post } from '../models/post';
import { PostExpandedComponent } from './post-expanded/post-expanded.component';
import { UploadComponent } from './upload/upload.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  data: Observable<any[]>;
  posts: Post[] = [];
  profileUrl: Observable<string | null>;
  avatar: string | null = "";

  constructor(
    private firestore: Firestore,
    private storage: AngularFireStorage,
    public dialog: MatDialog
  ) { 
    let collect = collection(this.firestore, 'posts');
    this.data = collectionData(collect);

    const ref = this.storage.ref('pinguino.jpg');
    this.profileUrl = ref.getDownloadURL();


  }

  ngOnInit(): void {
    // Posts
    this.data.subscribe((items) => {
      this.posts = items
      // console.log(items);
    });
    // Avatar
    this.profileUrl.subscribe((url) => {
      this.avatar = url;
      // console.log(url);
    });

  }

  // async getImage(preview: string){
    
  //   let photo = "";
  //   const ref = this.storage.ref(preview);
  //   ref.getDownloadURL().subscribe(url => {
  //     return photo;
  //     photo = url
  //   });

  // }

  openDialogPostExpanded(post: Post): void {
    const dialogRef = this.dialog.open(PostExpandedComponent, {
      // width: '250px',
      data: post,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogCreatePost(): void {
    const dialogRef = this.dialog.open(UploadComponent, { });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
