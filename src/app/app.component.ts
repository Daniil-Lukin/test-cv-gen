import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzI18nService, en_US } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cv-gen';

  constructor(private translateService: TranslateService, private i18n: NzI18nService) {
    this.translateService.use('en');
    i18n.setLocale(en_US);
  }
}
