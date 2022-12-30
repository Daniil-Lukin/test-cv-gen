import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cv-edit',
  templateUrl: './cv-edit.component.html',
  styleUrls: ['./cv-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
