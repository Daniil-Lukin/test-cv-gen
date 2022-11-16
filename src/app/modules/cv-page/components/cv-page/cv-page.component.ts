import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cv-page',
  templateUrl: './cv-page.component.html',
  styleUrls: ['./cv-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
