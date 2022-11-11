import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/modules/shared/services/storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  public authForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private storageService: StorageService) {}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      remember: [true],
    });
  }

  submitForm(): void {
    if (this.authForm.valid) {
      this.authService.signIn(this.email, this.password).subscribe((response) => {
        this.storageService.setUser(response.jwt, this.remember)
      })
    } else {
      Object.values(this.authForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  get email() {
    return this.authForm.get('email')?.value;
  }

  get password() {
    return this.authForm.get('password')?.value;
  }

  get remember() {
    return this.authForm.get('remember')?.value;
  }
}
