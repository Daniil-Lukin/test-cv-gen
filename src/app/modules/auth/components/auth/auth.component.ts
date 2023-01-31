import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { StorageService } from 'src/app/core/services/storage.service';
import { AuthService } from '../../services/auth.service';
import config from '../../../../core/extensions/configLanguages'

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
    let current = this.translateService.currentLang;
    const {lang, locale, dateLocale} = config[current];
    this.translateService.use(lang);
    this.i18n.setLocale(locale);
    this.i18n.setDateLocale(dateLocale);
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
