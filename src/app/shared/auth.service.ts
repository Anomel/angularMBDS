import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  currentUser: { password: string; isAdmin: boolean; username: string }[] = [
    {username: '', password: '', isAdmin: false}
  ];
  users: Array<{username: string, password: string, isAdmin: boolean}> = [
    {username: 'nomel', password: '1234', isAdmin: true},
    {username: 'oumou', password: '1234', isAdmin: false},
  ];

  constructor(
      private router: Router
  ) { }

  logIn(username, password) {
    // devrait prendre un login et un password en paramètres...

    for (let i = 0; i < this.users.length; i++ ) {
      // tslint:disable-next-line:triple-equals
      if (this.users[i].username == username && this.users[i].password == password) {
        this.loggedIn = true;
        this.currentUser[0].username = username;
        this.currentUser[0].isAdmin = this.users[i].isAdmin;
        return true;
      }
    }
  }

  logOut() {
    this.loggedIn = false;
    this.router.navigate(['/']);
  }

  isAdmin() {
    const isUserAdmin =  new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });

    return isUserAdmin;
    // return this.loggedIn;
  }
}

/*
  const admin = isAdmin(); // si on avait pas de promesse

  isAdmin().then((admin) => {
    console.log("Est un administrateur : " + admin);
  })
*/
