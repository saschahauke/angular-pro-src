import { Component, Output, EventEmitter, AfterContentInit, AfterViewInit, ContentChild, ViewChild, ElementRef, Renderer } from '@angular/core';

import { User } from './auth-form.interface';

import { AuthRememberComponent } from './auth-remember.component';
import { AuthMessageComponent } from './auth-message.component';

@Component({
  selector: 'auth-form',
  template: `
    <div>
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <h3>{{ title }}</h3>
        <label>
          Email address
          <input type="email" name="email" ngModel #email>
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel>
        </label>
        <ng-content select="auth-remember"></ng-content>
        <auth-message
          [style.display]="(showMessage ? 'inherit' : 'none')"></auth-message>
        <button type="submit">
          {{ title }}
        </button>
      </form>
    </div>
  `
})
export class AuthFormComponent implements AfterContentInit, AfterViewInit {

  title = 'Login';

  showMessage: boolean;

  @ViewChild('email') email: ElementRef;

  @ContentChild(AuthRememberComponent) remember: AuthRememberComponent;

  @ViewChild(AuthMessageComponent) message: AuthMessageComponent;

  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  constructor(private renderer: Renderer) { }

  ngAfterContentInit(): void {
    if (this.message) {
      this.message.days = 30;
    }
    if (this.remember) {
      this.remember.checked.subscribe((checked: boolean) => this.showMessage = checked);
    }
  }

  ngAfterViewInit(): void {
    this.renderer.setElementAttribute(this.email.nativeElement, 'placeholder', 'enter your email');
    // this.email.nativeElement.setAttribute('placeholder', 'Enter your email');
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }

}
