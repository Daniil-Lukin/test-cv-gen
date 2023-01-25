import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './modules/auth/auth.module';
import {
  MissingTranslationHandler,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { HttpLoaderFactory } from './modules/shared/extensions/httpLoaderFactory';
import { MissingTranslationService } from './modules/shared/extensions/translationErrorHandler';
import { en_US, NZ_DATE_LOCALE, NZ_I18N, ru_RU } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import ru from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import { StorageService } from './modules/shared/services/storage.service';
import { JwtInterceptor } from './modules/shared/interceptors/jwt-interceptor.interceptor';
import { enUS } from 'date-fns/locale';
import { NotificationInterceptor } from './modules/shared/interceptors/notification.interceptor';
registerLocaleData(en);
registerLocaleData(ru);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MissingTranslationService,
      },
      useDefaultLang: false,
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (storageService: StorageService) => () => {
        const jwtTokenLocal = localStorage.getItem('jwt');
        const jwtTokenSession = sessionStorage.getItem('jwt');
        if (jwtTokenLocal) {
          storageService.setUserData(
            jwtTokenLocal,
            localStorage.getItem('lang')
          );

        }
        if (jwtTokenSession) {
          storageService.setUserData(
            jwtTokenSession,
            sessionStorage.getItem('lang')
          );
        }
      },
      deps: [StorageService],
      multi: true,
    },
    {
      provide: NZ_I18N,
      useFactory: (localId: string) => () => {
        switch (localId) {
          case 'en':
            return en_US;
          case 'ru':
            return ru_RU;
          default:
            return en_US;
        }
      },
      deps: [LOCALE_ID],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
