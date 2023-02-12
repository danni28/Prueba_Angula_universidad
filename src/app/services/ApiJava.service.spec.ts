/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiJavaService } from './ApiJava.service';

describe('Service: ApiJava', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiJavaService]
    });
  });

  it('should ...', inject([ApiJavaService], (service: ApiJavaService) => {
    expect(service).toBeTruthy();
  }));
});
