import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private jwt: string;
  private lang: string;

  constructor() {}

  private setLocalStorageUser(): void {
    localStorage.setItem('jwt', this.jwt);
    localStorage.setItem('lang', this.lang);
  }

  private setSessionStorageUser(): void {
    sessionStorage.setItem('jwt', this.jwt);
    sessionStorage.setItem('lang', this.lang);
  }

  public setUser(
    token: string,
    rememberMe: boolean,
    lang: string = 'en_US'
  ): void {
    this.jwt = token;
    this.lang = lang;
    if (rememberMe) {
      this.setLocalStorageUser();
    } else {
      this.setSessionStorageUser();
    }
  }

  public removeUser(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.jwt = '';
    this.lang = '';
  }

  public setUserData(jwt: string, lang: string): void {
    this.jwt = jwt;
    this.lang = lang;
  }

  public getJwt(): string {
    return this.jwt
  }
}
