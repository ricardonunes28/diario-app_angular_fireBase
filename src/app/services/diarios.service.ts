import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Diary } from '../interfaces/diary';
import { AuthService } from './auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiariosService {

  constructor(
    private db: AngularFirestore,
    private authService: AuthService
  ) { }

  getDiaries(ownerKey: string) {
    return this.db.collection<Diary>('diares', (ref) => ref.where('ownerKey', '==', ownerKey)
    ).snapshotChanges()
    .pipe(
      map((snapshots)=>{
        return snapshots.map((doc)=>{
          return{
            key: doc.payload.doc.id,
            ...doc.payload.doc.data()
          }as Diary
        })
      })
    );
  }

  getAllDiares() {
    return this.db.collection<Diary>('diares').valueChanges();
  }

  addDiary(diary: Diary) {
    diary.ownerKey = this.authService.userData.uid;
    diary.author = this.authService.userData.displayName;

    return this.db.collection('diares').add(diary);
  }

  deleteDiary(diary: Diary) {
    return this.db.collection('diares').doc(diary.key).delete();
  }

  updateDiary(diary: Diary) {
    return this.db.collection('diares').doc(diary.key).update(diary);
  }
}
