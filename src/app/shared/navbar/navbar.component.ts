import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { AuthService } from '../auth.service';

@Component({
    selector: 'mta-navbar',
    template: `
    <md-toolbar color="primary">
        <span>Simple SPA</span>
        <span class="fill-space"></span>
        <button *ngIf="authService.isLoggedIn" md-button (click)="onLogout()">{{'Logout' | translate}}</button>
    </md-toolbar>
    `,
    directives: [
        ROUTER_DIRECTIVES,
        MD_TOOLBAR_DIRECTIVES,
        MD_BUTTON_DIRECTIVES
    ],
    pipes: [TranslatePipe]
})
export class NavbarComponent {
    isLoggedIn: boolean = false;

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }
    
    onLogout() {
        // TODO: this is usually async
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}