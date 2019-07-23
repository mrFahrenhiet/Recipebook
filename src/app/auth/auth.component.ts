import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  error: string = null;
  isLoading = false;
  constructor(private authService: AuthService, private router: Router) { }
  isLogin = true;
  doSwitch() {
    this.isLogin = !this.isLogin;
  }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    if (this.isLogin === true) {
      this.authService.signin(email, password).subscribe(resData => {
        this.isLoading = false;
        console.log(resData);
        this.router.navigate(['/recipes']);
      }, error => {
        this.isLoading = false;
        this.error = error.error.error.message;
      });
    } else {
    this.authService.signup(email, password).subscribe(responseData => {
      this.isLoading = false;
      console.log(responseData);
      this.router.navigate(['/recipes']);
    }, error => {
      this.isLoading = false;
      this.error = error.error.error.message ;
      console.log(this.error);
    });
  }
    form.reset();
}


}
