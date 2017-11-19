import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {UserService} from "../../shared/services/users.service";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/models/user.model";
import {Title, Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  regForm: FormGroup;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
  }

  ngOnInit() {
    if (this.title.getTitle() !== 'Регистрация') {
      this.title.setTitle('Регистрация');
      this.meta.addTags([
        { name: 'keywords', content: 'Регистрация'},
        { name: 'description', content: 'Страница для регистрации'}
      ]);
    }

    this.regForm = new FormGroup({
      'email': new FormControl(null, [
        Validators.required,
        Validators.email,
      ],
      this.forbiddenEmails.bind(this)
      ),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      'name': new FormControl(null, [
        Validators.required
      ]),
      'agree': new FormControl(false, [
        Validators.requiredTrue
      ]),
    });
  }

  get email() {
    return this.regForm.get('email');
  }

  get password() {
    return this.regForm.get('password');
  }

  get requiredPasswordLength() {
    return this.password.errors['minlength']['requiredLength'];
  }

  get actualPasswordLength() {
    return this.password.errors['minlength']['actualLength'];
  }

  get name() {
    return this.regForm.get('name');
  }

  get agree() {
    return this.regForm.get('agree');
  }

  onSubmit(event) {
    const {email, password, name} = this.regForm.value;
    const user = new User(email, password, name);

    this.userService
      .createNewUser(user)
      .subscribe( () => {
        this.router.navigate(['/login'], {
          queryParams: {
            nowCanLogin: true
          }
        })
      }
    );
  }

  forbiddenEmails(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService
        .getUserByEmail(control.value)
        .subscribe( (user: User) => {
          if (!user[0]) {
            resolve(null);
            return;
          }

          resolve({
            forbiddenEmail: true
          });
        })
    })
  }
}
