import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { equalFieldsValidator } from '../../extensions/passwordRepeatValidator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
  public registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      passwordRepeat: [
        null,
        Validators.compose([Validators.required, equalFieldsValidator('password')]),
      ],
    });
  }

  submitForm(): void {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.valid) {
      this.authService
        .registrate(this.userName, this.email, this.password)
        .subscribe(() => this.router.navigate(['home']));
    }
  }

  get userName(): string {
    return this.registrationForm.get('userName')?.value;
  }

  get email(): string {
    return this.registrationForm.get('email')?.value;
  }

  get password(): string {
    return this.registrationForm.get('password')?.value;
  }

  get passwordRepeat() {
    return this.registrationForm.get('password')?.value;
  }
}
