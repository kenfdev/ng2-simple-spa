import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';

import { AuthService } from '../auth.service';

@Component({
    selector: 'mta-navbar',
    template: `
    <md-toolbar color="primary">
        <span>Simple SPA</span>
        <span class="fill-space"></span>
        <button *ngIf="authService.isLoggedIn" md-button (click)="onLogout()">ログアウト</button>
    </md-toolbar>
    `,
    directives: [
        ROUTER_DIRECTIVES,
        MD_TOOLBAR_DIRECTIVES,
        MD_BUTTON_DIRECTIVES
    ]
})
export class NavbarComponent {
    isLoggedIn: boolean = false;

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }
    
    onLogout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}