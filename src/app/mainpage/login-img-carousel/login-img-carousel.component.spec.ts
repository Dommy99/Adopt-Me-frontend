import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginImgCarouselComponent } from './login-img-carousel.component';

describe('LoginImgCarouselComponent', () => {
  let component: LoginImgCarouselComponent;
  let fixture: ComponentFixture<LoginImgCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginImgCarouselComponent]
    });
    fixture = TestBed.createComponent(LoginImgCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
