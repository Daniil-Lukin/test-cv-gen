import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      remember: [true],
    });
  }

  submitForm(): void {
    this.authForm.markAllAsTouched();
    if (this.authForm.valid) {
      this.authService
        .signIn(this.email, this.password)
        .subscribe((response) => {
          this.storageService.setUser(
            response.jwt,
            this.remember,
            this.translateService.store.currentLang
          );
          this.router.navigate(['home'])
        });
    }
  }

  localizationButtonClick() {
    if (this.translateService.store.currentLang === 'en') {
      this.translateService.use('ru');
    } else {
      this.translateService.use('en');
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
