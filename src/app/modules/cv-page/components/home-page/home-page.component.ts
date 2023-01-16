import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  constructor(
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {}

  localizationButtonClick() {
    if (this.translateService.store.currentLang === 'en') {
      this.translateService.use('ru');
    } else {
      this.translateService.use('en');
    }
  }
}
