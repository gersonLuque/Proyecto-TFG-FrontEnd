import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {UserService} from '@core/services/user.service';
import {Observable} from 'rxjs';
import {UserResponsedDto} from '@core/dto/userResponsedDto';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-user-management',
  imports: [
    RouterOutlet,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit{
  public users$:Observable<UserResponsedDto[]>;

  constructor(private _userService:UserService,private router:Router) { }

  ngOnInit() {
    this.users$ = this._userService.getAllUsers();
  }
}
