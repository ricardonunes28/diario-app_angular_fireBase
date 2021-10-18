import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FirebaseError } from '@firebase/util';
import { LoginData } from '../login/login.data';
import { SignupData } from '../singup/signup.data';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private errorService: ErrorService
    ) { 
      this.auth.authState.subscribe((user)=>{
        this.userData = user;
      })
    }

    userData: any;

    errorEmitter = new EventEmitter<string>();

    get user() {
      return this.auth.user;
    }

    signup({email, password,birthdate,fullname}: SignupData){
      this.auth.createUserWithEmailAndPassword(email, password).then((creds)=>{
        this.sendEmailVerification(creds.user);
        creds.user?.updateProfile({ displayName: fullname });
        this.db.collection('users').doc(creds.user?.uid).set({birthdate, fullname});

        this.router.navigate(['/']);
      },
      (err: FirebaseError)=>{
        this.errorEmitter.emit(err.code);
      }
      );
    }

    login({email, password}: LoginData){
      this.auth.signInWithEmailAndPassword(email, password).then((creds)=>{
        this.sendEmailVerification(creds.user);
        this.router.navigate(['/']);
      },
      (err: FirebaseError)=>{
        this.errorEmitter.emit(err.code)
      }
      )
    }

    logout(){
      this.auth.signOut();
    }

    sendEmailVerification(user: any){
      if(!user?.emailVerified){
        user?.sendEmailVerification()
      }
    }

}
