import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setUser', () => {
    it('should set user in localStorage', () => {
      service.setUser('jwt1', true, 'en');
      expect(localStorage.getItem('jwt')).toBe('jwt1');
    })

    it('should set user in sessionStorage', () => {
      service.setUser('jwt2', false, 'ru');
      expect(sessionStorage.getItem('jwt')).toBe('jwt2');
    })
  });

  describe('removeUser', () => {
    it('should delete user from sessionStorage', () => {
      service.setUser('jwt', false, 'ru');
      service.removeUser();
      expect(sessionStorage.getItem('jwt')).not.toBe('jwt');
    })

    it('should delete user from localStorage', () => {
      service.setUser('jwt321', true, 'ru');
      expect(localStorage.getItem('jwt')).toBe('jwt321');
      service.removeUser();
      expect(localStorage.getItem('jwt')).not.toBe('jwt321');
    })
  })
});
