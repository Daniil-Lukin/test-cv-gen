import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse } from 'src/app/core/interfaces/auth-interfaces/auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public signIn(identifier: string, password: string): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      `${environment.apiUrl}/auth/local`,
      { identifier, password }
    );
  }

  public registrate(
    username: string,
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      `${environment.apiUrl}/auth/local/register`,
      { username, email, password }
    );
  }
}
