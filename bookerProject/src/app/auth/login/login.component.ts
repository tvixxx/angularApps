import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router, ActivatedRoute, Params} from "@angular/router";

import {UserService} from "../../shared/services/users.service";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/models/user.model";
import {Message} from "../../shared/models/message.model";
import {fadeStateTrigger} from "../../shared/animations/fade.animation";
import {Title, Meta} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message: Message;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {

  }

  ngOnInit() {
    if (this.title.getTitle() !== 'Вход в систему') {
      console.log('not equal');
      this.title.setTitle('Вход в систему');
      this.meta.addTags([
        { name: 'keywords', content: 'Логин'},
        { name: 'description', content: 'Страница для входа в систему'}
      ]);
    }

    this.message = new Message('danger', '');

    this.route.queryParams
      .subscribe( (params: Params) => {
        if (params['nowCanLoggin']) {
          this.showMessage({type: 'success', text: 'Теперь вы можете войти'});
        } else if (params['accessDenied']) {
          this.showMessage({type: 'warning', text: 'Вам необходимо войти в систему!'});
        }
      });

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  private showMessage(message: Message) {
    this.message = message;
    setTimeout(() => {
      this.clearMessage();
    }, 5000);
  }

  private clearMessage() {
    this.message.text = '';
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get requiredPasswordLength() {
    return this.password.errors['minlength']['requiredLength'];
  }

  get actualPasswordLength() {
    return this.password.errors['minlength']['actualLength'];
  }

  onSubmit(event) {
    const formData = this.loginForm.value;

    this.userService
      .getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (!user[0]) {
          this.showMessage({text: 'Такого пользователя не существует', type: 'danger'});
          return;
        }

        if (user[0].password !== formData.password) {
          this.showMessage({text: 'Пароль не верный', type: 'danger'});
          return;
        }

        this.clearMessage();
        localStorage.setItem('user', JSON.stringify(user[0]));
        this.authService.login();
        this.router.navigate(['/system', 'bill']);
      });
  }

}
