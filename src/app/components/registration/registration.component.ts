import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';
import { UserRegistor } from 'src/app/models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  // user: any = {};
  user: UserRegistor = {
    name: '',
    email: '',
    password: ''
  };
  errorMessage: string = '';
  registrationSuccess = false;

  constructor(private registrationService: AppService, private router: Router, private toastr: ToastrService){ };

  onSubmit() {
    if (!this.user.name || !this.user.email || !this.user.password) {
      this.errorMessage = 'Please provide all fields.';
      return;
    }

    this.registrationService.registerUser(this.user)
      .subscribe(
        (response) => {
          console.log('Registration successful:', response);
          this.toastr.success('registered successfully');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.toastr.error("something went wrong");
          this.errorMessage = 'Registration failed. Please try again.';
          
        }
      );
  }
}
