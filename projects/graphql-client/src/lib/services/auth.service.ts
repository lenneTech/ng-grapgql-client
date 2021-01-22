import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MODULE_CONFIG, ModuleConfig } from '../interfaces/module-config.interface';
import { BasicUser } from '../classes/basic-user.class';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Constructor
   */
  constructor(@Inject(MODULE_CONFIG) private moduleConfig: ModuleConfig, private storageService: StorageService) {
    this.token = this.storageService.load('token') as string;
    this.currentUser = this.storageService.load('currentUser') as BasicUser;
  }

  // #################################################################
  // Current User
  // #################################################################
  private _currentUser: BehaviorSubject<BasicUser> = new BehaviorSubject<BasicUser>(null);

  get currentUser(): BasicUser {
    return this._currentUser.value;
  }

  set currentUser(user: BasicUser) {
    this._currentUser.next(user);
    this.storageService.save('currentUser', user);
  }

  get currentUserObservable(): Observable<BasicUser> {
    return this._currentUser.asObservable();
  }

  // #################################################################
  // Token
  // #################################################################
  private _token: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  get token(): string {
    return this._token.value;
  }

  set token(token: string) {
    this._token.next(token);
    this.storageService.save('token', token);
  }

  get tokenObservable(): Observable<string> {
    return this._token.asObservable();
  }

  /**
   * Logout
   */
  public logout() {
    this.storageService.remove(['token', 'currentUser']);
    this.currentUser = null;
    this.token = null;
  }
}
