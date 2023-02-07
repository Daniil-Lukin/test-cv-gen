import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import config from '../../../../core/extensions/configLanguages'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  public title: string;
  public description: string;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private i18n: NzI18nService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const {title, description} = this.getLastRouteData();
    this.title = title;
    this.description = description;
    this.changeHeaders().subscribe((data) => {
      this.title = data['title'];
      this.description = data['description'];
      this.changeDetectorRef.markForCheck();
    })
  }

  localizationButtonClick() {
    let current = this.translateService.currentLang;
    const {lang, locale, dateLocale} = config[current];
    this.translateService.use(lang);
    this.i18n.setLocale(locale);
    this.i18n.setDateLocale(dateLocale);
  }

  public logOut() {
    this.storageService.removeUser();
    this.router.navigate(['/login']);
  }

  
  public changeHeaders(): Observable<Data> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        return this.getLastRouteData()
      })
    );
  }

  private getLastRouteData(): Data {
    const routerUrl = this.router.url.split('/').slice(2); // -2 потому что массив начинается с ['', 'home']
    let dataSource = this.activatedRoute;

    for(let i = 0; i < routerUrl.length; i++) {
      dataSource = dataSource?.firstChild;
    };

    return dataSource.snapshot.data;
  }

}
