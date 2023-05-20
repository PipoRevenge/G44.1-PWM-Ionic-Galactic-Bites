import { TestBed } from '@angular/core/testing';

import { SqliteDataService } from './sqlite-data.service';

describe('SqliteDataService', () => {
  let service: SqliteDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqliteDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
