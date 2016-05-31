import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { MdInput } from '@angular2-material/input'
import { MdButton } from '@angular2-material/button';
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';

import { AuthService } from '../../shared/auth.service';

@Component({
    selector: 'mta-login',
    templateUrl: 'src/app/top/login/login.component.html',
    directives: [ROUTER_DIRECTIVES, MdInput, MdButton],
    pipes: [TranslatePipe]
})
export class LoginComponent {
    constructor(
        private router: Router,
        private authService: AuthService,
        private translater: TranslateService
    ) { }

    onLogin(username: string, password: string) {
        this.authService.login(username, password)
            .subscribe(user => {
                this.router.navigate(['/dashboard']);
            });
    }

}