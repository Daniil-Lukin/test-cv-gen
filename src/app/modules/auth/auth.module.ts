import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthRoutingModule } from './auth-routing.module';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './components/registration/registration.component';



@NgModule({
  declarations: [AuthComponent, RegistrationComponent],
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
