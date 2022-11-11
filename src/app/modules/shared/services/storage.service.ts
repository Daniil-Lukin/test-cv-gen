import { Injectable } from '@angular/core';
import { LocalUser } from '../interfaces/local-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private userData: LocalUser = {
    jwt: null,
    lang: null,
  };
  private isLocal: boolean | null = null;

  constructor() {}

  private setLocalStorageUser(): void {
    localStorage.setItem('user', JSON.stringify(this.userData));
  }

  private setSessionStorageUser(): void {
    sessionStorage.setItem('user', JSON.stringify(this.userData));
  }

  setUser(token: string, isLocal: boolean, lang: string = 'en_US'): void {
    this.jwt = token;
    this.lang = lang;
    this.isLocal = isLocal
    if(isLocal) {
      this.setLocalStorageUser();
    } else {
      this.setSessionStorageUser();
    }
  }

  removeUser() {
    if(this.isLocal === null) {
      return
    } else {
      this.jwt = null;
      this.lang = null;
      if(this.isLocal) {
        localStorage.removeItem('user');
      } else {
        sessionStorage.removeItem('user');
      }
      this.isLocal = null;
    }
  }

  public get jwt(): string | null {
    return this.jwt;
  }

  public get lang(): string | null {
    return this.lang;
  }

  set jwt(token: string | null) {
    this.userData.jwt = token;
  }

  set lang(language: string | null) {
    this.userData.lang = language;
  }
}
