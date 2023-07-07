import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  loginError: boolean = false;

  currentRouter: string = '';

  user: User = {} as User;


  constructor(private router: Router, private userService: UsersService) {
  }

  onSubmit(userForm: any): void {

    this.user.username = userForm.form.value.username;
    this.user.password = userForm.form.value.password;
    console.log(this.user);
    this.userService.login(this.user.username, this.user.password).subscribe((loginError: boolean) => {
      this.loginError = loginError;
    });

  }

}
