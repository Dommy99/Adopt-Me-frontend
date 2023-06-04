import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlikesComponent } from './userlikes.component';

describe('UserlikesComponent', () => {
  let component: UserlikesComponent;
  let fixture: ComponentFixture<UserlikesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserlikesComponent]
    });
    fixture = TestBed.createComponent(UserlikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
