import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './sharedmodel/data-storage.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataStorageService, private authService: AuthService) {}
  ngOnInit() {
    this.authService.autoLogin();
  }
}
