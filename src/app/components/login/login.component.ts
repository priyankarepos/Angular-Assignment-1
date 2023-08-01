import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = {
    email: '',
    password: ''
  };

  errorMessage = '';

  constructor(
    private loginService: AppService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    if (!this.user.email || !this.user.password) {
      this.errorMessage = 'Please provide both email and password.';
      return;
    }
    this.loginService.loginUser(this.user)
      .subscribe(
        (response) => {
          let user = response
          console.log(response);
          
          localStorage.setItem('token', user.token);
          localStorage.setItem('userId', user.profile.id);
          this.toastr.success('logged in successfully');
          this.router.navigate(['/chat']);
        },
        (error) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid credentials. Please try again.';
          this.toastr.error(error.message);
        }
      );
  }

  onRedirect(){
    this.router.navigateByUrl('/register');
  }

}
