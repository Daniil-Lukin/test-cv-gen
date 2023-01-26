import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { en_US, NzI18nService, ru_RU, } from 'ng-zorro-antd/i18n';
import { enUS, ru } from 'date-fns/locale';
import { StorageService } from 'src/app/core/services/storage.service';
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
    private translateService: TranslateService,
    private i18n: NzI18nService,
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
        .subscribe({
          next: (response) => {
          this.storageService.setUser(
            response.jwt,
            this.remember,
            this.translateService.store.currentLang
          );
          this.router.navigate(['home'])
        },
      });
    }
  }

  public localizationButtonClick() {
    if (this.translateService.store.currentLang === 'en') {
      this.translateService.use('ru');
      this.i18n.setLocale(ru_RU);
      this.i18n.setDateLocale(ru);
    } else {
      this.translateService.use('en');
      this.i18n.setLocale(en_US);
      this.i18n.setDateLocale(enUS)
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
