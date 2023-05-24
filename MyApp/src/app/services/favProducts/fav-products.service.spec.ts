import { TestBed } from '@angular/core/testing';

import { FavProductsService } from './fav-products.service';

describe('FavProductsService', () => {
  let service: FavProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
