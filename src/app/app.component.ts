import { Component } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { MdIcon, MdIconRegistry} from '@angular2-material/icon';
import { MdInput } from '@angular2-material/input'
import { TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';

import { DataService } from './shared/data.service.ts';
import { AuthService } from './shared/auth.service';
import { PostsService } from './shared/posts.service';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './top/login/login.component';
import { SignupComponent } from './top/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostEditComponent } from './posts/edit/postEdit.component';

@Component({
    selector: 'mta-app',
    styleUrls: ['src/app/app.component.css'],
    template: `
    <mta-navbar></mta-navbar>
    <div class="container"><router-outlet></router-outlet></div>
    `,
    directives: [
        ROUTER_DIRECTIVES,
        NavbarComponent
    ],
    providers: [
        MdIconRegistry,
        DataService,
        AuthService,
        PostsService
    ]
})
@Routes([
    {
        // TODO: no way to add default route now
        path: '',
        component: LoginComponent
    },
    {
        path: '/login',
        component: LoginComponent
    },
    {
        path: '/signup',
        component: SignupComponent
    },
    {
        path: '/dashboard',
        component: DashboardComponent
    },
    {
        path: '/posts/new',
        component: PostEditComponent
    },
    {
        path: '/posts/:postId',
        component: PostEditComponent
    },
    {
        path: '*',
        component: LoginComponent
    }
])
export class AppComponent {
    constructor(
        private router: Router,
        private translate: TranslateService
    ) {
        var userLang = navigator.language.split('-')[0]; // use navigator lang if available
        userLang = /(ja|en)/gi.test(userLang) ? userLang : 'en';

        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(userLang);
    }
}