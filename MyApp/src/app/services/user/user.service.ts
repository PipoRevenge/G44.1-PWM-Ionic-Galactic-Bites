import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { FirebaseAuthService } from '../database/firebase-auth.service';
import { __await } from 'tslib';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private firebaseAuthService: FirebaseAuthService, private shoppingCartService: ShoppingCartService) {}

  user: User | null = null;

  //  async isLogged(): Promise<boolean> {
  //    return true//return await this.firebaseAuthService.isLoggedIn();
  //  } 

  isLogged(): Observable<boolean> {
    return from(this.firebaseAuthService.isLoggedIn());
  }

  async logout(): Promise<void> {
    return await this.firebaseAuthService.logout().then(() => {
      this.user = null;
    })
  }
  
  async login(email: string, password: string): Promise<boolean> {
  try {
    const user = await this.firebaseAuthService.login({ email, password });
    this.user = user;
    
    try {
      await this.setUpCarritoWey();
      try {
        await this.updateData();
        return true;
      } catch (e) {
        console.error('Error updating data', e);
        return false;
      }
    } catch (e) {
      console.error('Error setting up carrito', e);
      return false;
    }
  } catch (e) {
    console.error('Error logging in user', e);
    return false;
  }
}

  async signup(name: string, email: string, password: string, phone: string): Promise<boolean> {  
    return await this.firebaseAuthService.signUp({ email, password, name, phone })
      .then((user) => {
        this.user = user;
        console.log(user);
        if (this.user != null) return true;
        return false;
      })
      .catch((e) => {
        console.error('error signing up user', e)
        return false;
      });
  }
  async setUpCarritoWey(): Promise<void> {
    return this.shoppingCartService.setData(this.user.shoppingCart);
  }
  async setPoints(newPoints:number):Promise<void> {
    this.user.points += newPoints;
    await this.saveUserData(this.user);
  
  }
  async passwordExist(password: string): Promise<boolean> {
    return await this.firebaseAuthService.checkPassword(password);

  }


  async emailExists(email: string): Promise<boolean> {
    return this.firebaseAuthService.checkIfEmailExists(email)
      .then((value) => {
        return value;
      })
      .catch((e) => {
        console.error('error checking email', e)
        return false;
      });
  }
  async updateEmail(email: string): Promise<boolean> {
    this.user.email = email;
    return this.firebaseAuthService.saveUser(this.user).then(async () =>
    {return await this.firebaseAuthService.updateEmail(email) })
  }
  async updatePassword(password: string): Promise<boolean> {
    return await this.firebaseAuthService.updatePassword(password)
  }


  async updateData():Promise<void>  {
    this.shoppingCartService.shoppingCart.subscribe(async (value) => {
      this.user.shoppingCart = value;
      await this.firebaseAuthService.saveUser(this.user).then(() => { return; }); 
    }
     
   )
  }
  async saveUserData(userChanges:User): Promise<void> {
    this.user = userChanges;
    await this.firebaseAuthService.saveUser(this.user).then(() => { return; }); 
  
  }
  async deleteUser(): Promise<void> {
    return await this.firebaseAuthService.deleteUser(this.user).then(()=>{
      this.user = null;
    })
  }
  getUserPoints() {
    return this.user.points;
  }
  
  
  
}