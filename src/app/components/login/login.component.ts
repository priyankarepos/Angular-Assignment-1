import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

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
    private router: Router
  ) {}

  onSubmit() {
    if (!this.user.email || !this.user.password) {
      this.errorMessage = 'Please provide both email and password.';
      return;
    }
    this.loginService.loginUser(this.user)
      .subscribe(
        (response) => {
          console.log('Login successful:', response);
          // this.loginService.saveToken(response.token);
          this.router.navigate(['/chat']);
          // this.router.navigate([{ outlets: { userList: ['chat'], conversationHistory: null } }]);
        },
        (error) => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      );
  }

  onRedirect(){
    this.router.navigateByUrl('/register');
  }

}
