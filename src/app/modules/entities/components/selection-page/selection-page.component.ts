import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selection-page',
  templateUrl: './selection-page.component.html',
  styleUrls: ['./selection-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectionPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
