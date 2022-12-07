import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitieComponent } from './entitie.component';

describe('EntitieComponent', () => {
  let component: EntitieComponent;
  let fixture: ComponentFixture<EntitieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
