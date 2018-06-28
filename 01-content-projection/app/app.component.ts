import { Component, ViewContainerRef, ViewChild, ComponentFactoryResolver, AfterContentInit, TemplateRef } from '@angular/core';

import { User } from './auth-form/auth-form.interface';

import { AuthFormComponent } from './auth-form/auth-form.component';

@Component({
  selector: 'app-root',
  template: `
    <div>
     <div #entry></div>
    </div>
  `
})
export class AppComponent  implements AfterContentInit {

  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver
  ) {}

  ngAfterContentInit(): void {
    const authFormFactory = this.resolver.resolveComponentFactory(AuthFormComponent);
    const component = this.entry.createComponent(authFormFactory);
  }

  rememberMe: boolean = false;

  rememberUser(remember: boolean) {
    this.rememberMe = remember;
  }

  createUser(user: User) {
    console.log('Create account', user);
  }

  loginUser(user: User) {
    console.log('Login', user, this.rememberMe);
  }

}
