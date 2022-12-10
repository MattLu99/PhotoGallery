import { TestBed } from '@angular/core/testing';

import { PhotoGalleryBackendService } from './photo-gallery-backend.service';

describe('PhotoGalleryBackendService', () => {
  let service: PhotoGalleryBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoGalleryBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
