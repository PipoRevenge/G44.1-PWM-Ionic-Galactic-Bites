import { Injectable } from '@angular/core';
import {
  
} from 'firebase/auth';
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updatePassword } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseDataService } from './firebase-data.service';
import { User } from 'src/app/models/user';
import * as firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  
  constructor(private auth: Auth, private afAuth: AngularFireAuth, private firestoreService: FirebaseDataService) {}

  async signUp({email, password, name, phone}: {email: string; password: string; name:string; phone:string;}): Promise<User | null>  {
    try {
      return createUserWithEmailAndPassword(this.auth, email, password).then(
        async (credential) => {
          const uid = credential.user.uid;
          const user: User = {
            id: uid,
            name: name,
            email: email,
            points: 0,
            phone: phone,
            shoppingCart: new Map<string, number>(),
            favProducts:  []
          };
          return this.firestoreService.setUserData(user).then(() => { return user});
      })
    } catch (error) {
      console.error('Error registering user:', error);
      return null;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    if (this.auth.currentUser !== null) {
      return true;
    } else {
      return false;
    }
  }

  async login({email, password }: { email: string; password: string }): Promise<User | null> {
      return signInWithEmailAndPassword(this.auth, email, password).then(()=>{
        return this.firestoreService.getUserData(this.auth.currentUser.uid)
      })
  }

  async checkIfEmailExists(email: string): Promise<boolean> {
    try {
      return this.afAuth.fetchSignInMethodsForEmail(email).then((value)=> {return value.length > 0})
    } catch (error) {
      console.error('Error checking if email exists:', error);
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('User logged out.');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
  async saveUser(user: User):Promise<void> {
    return await this.firestoreService.updateUser(user).then(() => { return; })
  }
  async checkPassword(password: string): Promise<boolean> {
      const user = await this.afAuth.currentUser;
      if (user) {
        try {
          const credential = EmailAuthProvider.credential(user.email, password);
          await user.reauthenticateWithCredential(credential);
          return true;
        } catch (error) {
          console.error('Error checking password:', error);
          return false;
        }
      }
      return false;
    }

  async updateEmail(newEmail: string):Promise<boolean> {
    return await this.afAuth.currentUser.then((user) => {
       
       return user.updateEmail(newEmail).then(() => {
         console.log("Correo electrónico actualizado exitosamente");
          return true;
      }).catch((error) => {
        console.error("Error al actualizar el correo electrónico:", error)
           return false;
      });
      })
}
  async updatePassword(newPassword: string): Promise<boolean> {
    return await this.afAuth.currentUser.then((user) => {
       return user.updatePassword(newPassword).then(() => {
         console.log("Contraseña actualizado exitosamente");
          return true;
      }).catch((error) => {
        console.error("Error al actualizar la Contraseña:", error)
           return false;
      });
      })
  }

  async deleteUser(user2:User): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (user) {
      try {
        await this.firestoreService.deleteUserData(user2).then(async () => {
          await user.delete();

        });
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  }
  async addFavProductAtUser(id: string) {
    //implementar
    throw new Error('Method not implemented.');
  }

}
