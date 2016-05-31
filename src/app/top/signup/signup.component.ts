import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { MdInput } from '@angular2-material/input'
import { MdButton } from '@angular2-material/button';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { AuthService } from '../../shared/auth.service';

@Component({
    selector: 'mta-signup',
    templateUrl: 'src/app/top/signup/signup.component.html',
    directives: [ROUTER_DIRECTIVES, MdInput, MdButton],
    pipes: [TranslatePipe]
})
export class SignupComponent {
    constructor(
        private router: Router,
        private authService: AuthService
        ) { }

    handleSignup(username: string, password: string) {
        this.authService.signup(username, password)
            .subscribe(user => {
                this.router.navigate(['/dashboard']);
            });
    }
}