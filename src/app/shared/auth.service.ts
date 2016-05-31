import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { DataService } from './data.service';

import 'rxjs/add/operator/first';

@Injectable()
export class AuthService {
    // TODO: would be something like `api/login` in real world 
    loginUrl = 'api/users';
    // TODO: would be something like `api/signup` in real world
    signupUrl = 'api/users';
    loggedInUser: any;
    
    get isLoggedIn() {
        return !!this.loggedInUser
    }

    constructor(private dataService: DataService) { }

    login(username: string, password: string) {
        return this.dataService.get(
            this.loginUrl, { username, password }
        ).map(res => {
            if (res.length === 0) {
                throw new Error('login failed');
            }
            return res[0];
        }).do(user => {
            this.loggedInUser = user
        });
    }

    signup(username: string, password: string) {
        const data = { username, password };

        return this.dataService.save(this.signupUrl, data)
            .do(user => this.loggedInUser = user);
    }
    
    logout() {
        this.loggedInUser = undefined;
    }
}
