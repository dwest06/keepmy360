import { Component, Inject, OnInit } from '@angular/core';
// Material
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// Models
import { Post } from 'src/app/models/post';

// Firebase
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-post-expanded',
  templateUrl: './post-expanded.component.html',
  styleUrls: ['./post-expanded.component.scss']
})
export class PostExpandedComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private storage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    (window as any).pannellum.viewer('panorama', {
      "type": "equirectangular",
      "panorama": this.data.file
    })

  }

  /**
   * initPannellum
   * 
   * Metodo para hacer un recorrido, en una siguiente etapa
   */
  // public initPannellum(escenas: any) {

  //   console.log(escenas);

  //   pannellum.viewer('panorama', {
  //     "showFullscreenCtrl": true,
  //     "autoLoad": true,
  //     "multiResMinHfov": true,
  //     "default": {
  //       "firstScene": this.post.title,
  //       "sceneFadeDuration": 1000
  //     },
  //     "scenes": escenas
  //   });
  // }
}
