import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from './auth.model';
import { Router } from '@angular/router';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

interface AuthResponseDataLogin {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private timer: any = null;
  user = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient, private router: Router) { }
  signup(email: string, password: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjEad4Ag4kXCtPMe3geA85au7L0_X4VmU ', {
      email,
      password,
      returnSecureToken: true
    }).pipe(tap(resData => {
      const expire = new Date(new Date().getTime() + +resData.expiresIn * 1000 );
      const user = new User(resData.email, resData.localId, resData.idToken, expire);
      this.user.next(user);
    }));
  }
  signin(email: string, password: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.post<AuthResponseDataLogin>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyDjEad4Ag4kXCtPMe3geA85au7L0_X4VmU', {
      email,
      password,
      returnSecureToken: true
    }).pipe(tap(resData => {
      const expire = new Date(new Date().getTime() + +resData.expiresIn * 1000 );
      const user = new User(resData.email, resData.localId, resData.idToken, expire);
      this.user.next(user);
      this.autoLogout(expire.getTime());
      localStorage.setItem('userData', JSON.stringify(user));
    }));
  }
  signout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
  autoLogin() {
    const loadedData: {
      email: string;
      id: string;
      _token: string;
      _expirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!loadedData) {
      return;
    }
    const loadedUser = new User(loadedData.email, loadedData.id, loadedData._token, new Date( loadedData._expirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const duration = new Date(loadedData._expirationDate).getTime() - new Date().getTime();
      this.autoLogout(duration);
    }
  }
  autoLogout(expTime: number) {
    this.timer = setTimeout(() => {
      this.signout();
    }, expTime);
  }
}
