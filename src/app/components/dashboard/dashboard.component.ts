import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private loginService: AppService, private router: Router) {}

  onLogout() {
    // this.loginService.removeToken();
    this.router.navigate(['/login']);
  }
}
