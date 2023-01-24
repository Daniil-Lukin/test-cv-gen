import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { en_US, NzI18nService, ru_RU } from 'ng-zorro-antd/i18n';
import { enUS, ru } from 'date-fns/locale';
import { StorageService } from 'src/app/modules/shared/services/storage.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  constructor(
    private storageService: StorageService,
    private router: Router,
    private translateService: TranslateService,
    private i18n: NzI18nService,
  ) {}

  ngOnInit(): void {}

  localizationButtonClick() {
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

  public logOut() {
    this.storageService.removeUser();
    this.router.navigate(['/login']);
  }
}
