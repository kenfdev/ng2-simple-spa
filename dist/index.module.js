var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("app/shared/data.service", ['@angular/core', '@angular/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1;
    var DataService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            DataService = (function () {
                function DataService(http) {
                    this.http = http;
                }
                DataService.prototype.get = function (url, query) {
                    if (query === void 0) { query = {}; }
                    var params = new http_1.URLSearchParams();
                    for (var _i = 0, _a = Object.keys(query); _i < _a.length; _i++) {
                        var key = _a[_i];
                        params.set(key, query[key]);
                    }
                    return this.http.get(url, {
                        search: params
                    }).map(this.extractData);
                };
                DataService.prototype.save = function (url, data) {
                    if (data.id) {
                        return this.put(url + "/" + data.id, data);
                    }
                    else {
                        return this.post(url, data);
                    }
                };
                DataService.prototype.post = function (url, data) {
                    var body = JSON.stringify(data);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(url, body, options)
                        .map(this.extractData);
                };
                DataService.prototype.put = function (url, data) {
                    var body = JSON.stringify(data);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.put(url, body, options)
                        .map(this.extractData);
                };
                DataService.prototype.delete = function (url) {
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.delete(url);
                };
                DataService.prototype.extractData = function (res) {
                    var body = res.json();
                    return body || {};
                };
                DataService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], DataService);
                return DataService;
            }());
            exports_1("DataService", DataService);
        }
    }
});
System.register("app/shared/auth.service", ['@angular/core', "app/shared/data.service", 'rxjs/add/operator/first'], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_2, data_service_1;
    var AuthService;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (data_service_1_1) {
                data_service_1 = data_service_1_1;
            },
            function (_1) {}],
        execute: function() {
            AuthService = (function () {
                function AuthService(dataService) {
                    this.dataService = dataService;
                    // TODO: would be something like `api/login` in real world 
                    this.loginUrl = 'api/users';
                    // TODO: would be something like `api/signup` in real world
                    this.signupUrl = 'api/users';
                }
                Object.defineProperty(AuthService.prototype, "isLoggedIn", {
                    get: function () {
                        return !!this.loggedInUser;
                    },
                    enumerable: true,
                    configurable: true
                });
                AuthService.prototype.login = function (username, password) {
                    var _this = this;
                    return this.dataService.get(this.loginUrl, { username: username, password: password }).map(function (res) {
                        if (res.length === 0) {
                            throw new Error('login failed');
                        }
                        return res[0];
                    }).do(function (user) {
                        _this.loggedInUser = user;
                    });
                };
                AuthService.prototype.signup = function (username, password) {
                    var _this = this;
                    var data = { username: username, password: password };
                    return this.dataService.save(this.signupUrl, data)
                        .do(function (user) { return _this.loggedInUser = user; });
                };
                AuthService.prototype.logout = function () {
                    this.loggedInUser = undefined;
                };
                AuthService = __decorate([
                    core_2.Injectable(), 
                    __metadata('design:paramtypes', [data_service_1.DataService])
                ], AuthService);
                return AuthService;
            }());
            exports_2("AuthService", AuthService);
        }
    }
});
System.register("app/shared/posts.service", ['@angular/core', "app/shared/data.service"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_3, data_service_2;
    var PostsService;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (data_service_2_1) {
                data_service_2 = data_service_2_1;
            }],
        execute: function() {
            PostsService = (function () {
                function PostsService(dataService) {
                    this.dataService = dataService;
                    this.postsUrl = 'api/posts';
                }
                PostsService.prototype.getPosts = function () {
                    var query = {
                        _sort: 'created',
                        _order: 'DESC'
                    };
                    return this.dataService.get(this.postsUrl, query)
                        .map(function (res) {
                        var parsed = res.map(function (item) {
                            return {
                                id: item.id,
                                title: item.title,
                                contents: item.contents,
                                created: Date.parse(item.created)
                            };
                        });
                        return parsed;
                    });
                };
                PostsService.prototype.getPost = function (id) {
                    return this.dataService.get(this.postsUrl + "/" + id);
                };
                PostsService.prototype.save = function (data) {
                    // TODO: you won't create a 'created' from client in production
                    var postData = Object.assign({}, data, { created: new Date() });
                    return this.dataService.save(this.postsUrl, postData);
                };
                PostsService.prototype.deletePost = function (id) {
                    return this.dataService.delete(this.postsUrl + "/" + id);
                };
                PostsService = __decorate([
                    core_3.Injectable(), 
                    __metadata('design:paramtypes', [data_service_2.DataService])
                ], PostsService);
                return PostsService;
            }());
            exports_3("PostsService", PostsService);
        }
    }
});
System.register("app/shared/navbar/navbar.component", ['@angular/core', '@angular/router', '@angular2-material/toolbar', '@angular2-material/button', 'ng2-translate/ng2-translate', "app/shared/auth.service"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_4, router_1, toolbar_1, button_1, ng2_translate_1, auth_service_1;
    var NavbarComponent;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (toolbar_1_1) {
                toolbar_1 = toolbar_1_1;
            },
            function (button_1_1) {
                button_1 = button_1_1;
            },
            function (ng2_translate_1_1) {
                ng2_translate_1 = ng2_translate_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            NavbarComponent = (function () {
                function NavbarComponent(router, authService) {
                    this.router = router;
                    this.authService = authService;
                    this.isLoggedIn = false;
                }
                NavbarComponent.prototype.onLogout = function () {
                    // TODO: this is usually async
                    this.authService.logout();
                    this.router.navigate(['/login']);
                };
                NavbarComponent = __decorate([
                    core_4.Component({
                        selector: 'mta-navbar',
                        template: "\n    <md-toolbar color=\"primary\">\n        <span>Simple SPA</span>\n        <span class=\"fill-space\"></span>\n        <button *ngIf=\"authService.isLoggedIn\" md-button (click)=\"onLogout()\">{{'Logout' | translate}}</button>\n    </md-toolbar>\n    ",
                        directives: [
                            router_1.ROUTER_DIRECTIVES,
                            toolbar_1.MD_TOOLBAR_DIRECTIVES,
                            button_1.MD_BUTTON_DIRECTIVES
                        ],
                        pipes: [ng2_translate_1.TranslatePipe]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, auth_service_1.AuthService])
                ], NavbarComponent);
                return NavbarComponent;
            }());
            exports_4("NavbarComponent", NavbarComponent);
        }
    }
});
System.register("app/top/login/login.component", ['@angular/core', '@angular/router', '@angular2-material/input', '@angular2-material/button', 'ng2-translate/ng2-translate', "app/shared/auth.service"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_5, router_2, input_1, button_2, ng2_translate_2, auth_service_2;
    var LoginComponent;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            },
            function (input_1_1) {
                input_1 = input_1_1;
            },
            function (button_2_1) {
                button_2 = button_2_1;
            },
            function (ng2_translate_2_1) {
                ng2_translate_2 = ng2_translate_2_1;
            },
            function (auth_service_2_1) {
                auth_service_2 = auth_service_2_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(router, authService, translater) {
                    this.router = router;
                    this.authService = authService;
                    this.translater = translater;
                }
                LoginComponent.prototype.onLogin = function (username, password) {
                    var _this = this;
                    this.authService.login(username, password)
                        .subscribe(function (user) {
                        _this.router.navigate(['/dashboard']);
                    });
                };
                LoginComponent = __decorate([
                    core_5.Component({
                        selector: 'mta-login',
                        templateUrl: 'src/app/top/login/login.component.html',
                        directives: [router_2.ROUTER_DIRECTIVES, input_1.MdInput, button_2.MdButton],
                        pipes: [ng2_translate_2.TranslatePipe]
                    }), 
                    __metadata('design:paramtypes', [router_2.Router, auth_service_2.AuthService, ng2_translate_2.TranslateService])
                ], LoginComponent);
                return LoginComponent;
            }());
            exports_5("LoginComponent", LoginComponent);
        }
    }
});
System.register("app/top/signup/signup.component", ['@angular/core', '@angular/router', '@angular2-material/input', '@angular2-material/button', 'ng2-translate/ng2-translate', "app/shared/auth.service"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_6, router_3, input_2, button_3, ng2_translate_3, auth_service_3;
    var SignupComponent;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (router_3_1) {
                router_3 = router_3_1;
            },
            function (input_2_1) {
                input_2 = input_2_1;
            },
            function (button_3_1) {
                button_3 = button_3_1;
            },
            function (ng2_translate_3_1) {
                ng2_translate_3 = ng2_translate_3_1;
            },
            function (auth_service_3_1) {
                auth_service_3 = auth_service_3_1;
            }],
        execute: function() {
            SignupComponent = (function () {
                function SignupComponent(router, authService) {
                    this.router = router;
                    this.authService = authService;
                }
                SignupComponent.prototype.handleSignup = function (username, password) {
                    var _this = this;
                    this.authService.signup(username, password)
                        .subscribe(function (user) {
                        _this.router.navigate(['/dashboard']);
                    });
                };
                SignupComponent = __decorate([
                    core_6.Component({
                        selector: 'mta-signup',
                        templateUrl: 'src/app/top/signup/signup.component.html',
                        directives: [router_3.ROUTER_DIRECTIVES, input_2.MdInput, button_3.MdButton],
                        pipes: [ng2_translate_3.TranslatePipe]
                    }), 
                    __metadata('design:paramtypes', [router_3.Router, auth_service_3.AuthService])
                ], SignupComponent);
                return SignupComponent;
            }());
            exports_6("SignupComponent", SignupComponent);
        }
    }
});
System.register("app/dashboard/dashboard.component", ['@angular/core', '@angular/router', '@angular2-material/list', '@angular2-material/card', '@angular2-material/progress-circle', '@angular2-material/button', 'ng2-translate/ng2-translate', "app/shared/posts.service", "app/shared/auth.service"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_7, router_4, list_1, card_1, progress_circle_1, button_4, ng2_translate_4, posts_service_1, auth_service_4;
    var DashboardComponent;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (router_4_1) {
                router_4 = router_4_1;
            },
            function (list_1_1) {
                list_1 = list_1_1;
            },
            function (card_1_1) {
                card_1 = card_1_1;
            },
            function (progress_circle_1_1) {
                progress_circle_1 = progress_circle_1_1;
            },
            function (button_4_1) {
                button_4 = button_4_1;
            },
            function (ng2_translate_4_1) {
                ng2_translate_4 = ng2_translate_4_1;
            },
            function (posts_service_1_1) {
                posts_service_1 = posts_service_1_1;
            },
            function (auth_service_4_1) {
                auth_service_4 = auth_service_4_1;
            }],
        execute: function() {
            DashboardComponent = (function () {
                function DashboardComponent(router, postsService, authService) {
                    this.router = router;
                    this.postsService = postsService;
                    this.authService = authService;
                    this.posts = [];
                }
                DashboardComponent.prototype.ngOnInit = function () {
                    this.fetchPosts();
                };
                DashboardComponent.prototype.fetchPosts = function () {
                    var _this = this;
                    this.postsService.getPosts()
                        .subscribe(function (posts) { return _this.posts = posts; });
                };
                DashboardComponent.prototype.onNewClicked = function () {
                    this.router.navigate(['/posts/new']);
                };
                DashboardComponent.prototype.onEdit = function (post) {
                    this.router.navigate([("/posts/" + post.id)]);
                };
                DashboardComponent.prototype.onDelete = function (post) {
                    var _this = this;
                    // TODO: replace when md-dialog is ready
                    if (window.confirm('削除してもいいですか？')) {
                        this.postsService.deletePost(post.id)
                            .subscribe(function (res) {
                            _this.fetchPosts();
                        });
                    }
                };
                DashboardComponent = __decorate([
                    core_7.Component({
                        selector: 'mta-dashboard',
                        templateUrl: 'src/app/dashboard/dashboard.component.html',
                        directives: [
                            router_4.ROUTER_DIRECTIVES,
                            progress_circle_1.MD_PROGRESS_CIRCLE_DIRECTIVES,
                            list_1.MD_LIST_DIRECTIVES,
                            card_1.MD_CARD_DIRECTIVES,
                            button_4.MdButton
                        ],
                        pipes: [ng2_translate_4.TranslatePipe]
                    }), 
                    __metadata('design:paramtypes', [router_4.Router, posts_service_1.PostsService, auth_service_4.AuthService])
                ], DashboardComponent);
                return DashboardComponent;
            }());
            exports_7("DashboardComponent", DashboardComponent);
        }
    }
});
System.register("app/posts/edit/postEdit.component", ['@angular/core', '@angular/router', '@angular/common', '@angular2-material/progress-circle', '@angular2-material/input', '@angular2-material/button', 'ng2-translate/ng2-translate', "app/shared/posts.service"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_8, router_5, common_1, progress_circle_2, input_3, button_5, ng2_translate_5, posts_service_2;
    var PostEditComponent;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (router_5_1) {
                router_5 = router_5_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (progress_circle_2_1) {
                progress_circle_2 = progress_circle_2_1;
            },
            function (input_3_1) {
                input_3 = input_3_1;
            },
            function (button_5_1) {
                button_5 = button_5_1;
            },
            function (ng2_translate_5_1) {
                ng2_translate_5 = ng2_translate_5_1;
            },
            function (posts_service_2_1) {
                posts_service_2 = posts_service_2_1;
            }],
        execute: function() {
            PostEditComponent = (function () {
                function PostEditComponent(router, routeSegment, fb, postsService, translate) {
                    this.router = router;
                    this.routeSegment = routeSegment;
                    this.fb = fb;
                    this.postsService = postsService;
                    this.translate = translate;
                    this.postId = +routeSegment.getParam('postId');
                }
                PostEditComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (this.postId) {
                        this.title = this.translate.instant('Edit Post');
                        this.postsService.getPost(this.postId)
                            .subscribe(function (res) {
                            _this.form = _this.fb.group({
                                id: res.id,
                                title: res.title,
                                contents: res.contents
                            });
                        });
                    }
                    else {
                        this.title = this.translate.instant('Create Post');
                        this.form = this.fb.group({
                            title: '',
                            contents: ''
                        });
                    }
                };
                PostEditComponent.prototype.onSendPost = function (v) {
                    var _this = this;
                    this.postsService.save(v)
                        .subscribe(function (res) {
                        _this.router.navigate(['/dashboard']);
                    });
                };
                PostEditComponent.prototype.onCanceled = function () {
                    this.router.navigate(['/dashboard']);
                };
                PostEditComponent = __decorate([
                    core_8.Component({
                        selector: 'mta-post-edit',
                        templateUrl: 'src/app/posts/edit/postEdit.component.html',
                        directives: [progress_circle_2.MD_PROGRESS_CIRCLE_DIRECTIVES, common_1.FORM_DIRECTIVES, input_3.MdInput, button_5.MdButton],
                        pipes: [ng2_translate_5.TranslatePipe]
                    }), 
                    __metadata('design:paramtypes', [router_5.Router, router_5.RouteSegment, common_1.FormBuilder, posts_service_2.PostsService, ng2_translate_5.TranslateService])
                ], PostEditComponent);
                return PostEditComponent;
            }());
            exports_8("PostEditComponent", PostEditComponent);
        }
    }
});
System.register("app/app.component", ['@angular/core', '@angular/router', '@angular2-material/icon', 'ng2-translate/ng2-translate', "app/shared/data.service", "app/shared/auth.service", "app/shared/posts.service", "app/shared/navbar/navbar.component", "app/top/login/login.component", "app/top/signup/signup.component", "app/dashboard/dashboard.component", "app/posts/edit/postEdit.component"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var core_9, router_6, icon_1, ng2_translate_6, data_service_ts_1, auth_service_5, posts_service_3, navbar_component_1, login_component_1, signup_component_1, dashboard_component_1, postEdit_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_9_1) {
                core_9 = core_9_1;
            },
            function (router_6_1) {
                router_6 = router_6_1;
            },
            function (icon_1_1) {
                icon_1 = icon_1_1;
            },
            function (ng2_translate_6_1) {
                ng2_translate_6 = ng2_translate_6_1;
            },
            function (data_service_ts_1_1) {
                data_service_ts_1 = data_service_ts_1_1;
            },
            function (auth_service_5_1) {
                auth_service_5 = auth_service_5_1;
            },
            function (posts_service_3_1) {
                posts_service_3 = posts_service_3_1;
            },
            function (navbar_component_1_1) {
                navbar_component_1 = navbar_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (signup_component_1_1) {
                signup_component_1 = signup_component_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (postEdit_component_1_1) {
                postEdit_component_1 = postEdit_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(router, translate) {
                    this.router = router;
                    this.translate = translate;
                    var userLang = navigator.language.split('-')[0]; // use navigator lang if available
                    userLang = /(ja|en)/gi.test(userLang) ? userLang : 'en';
                    // this language will be used as a fallback when a translation isn't found in the current language
                    translate.setDefaultLang('en');
                    // the lang to use, if the lang isn't available, it will use the current loader to get them
                    translate.use(userLang);
                }
                AppComponent = __decorate([
                    core_9.Component({
                        selector: 'mta-app',
                        styleUrls: ['src/app/app.component.css'],
                        template: "\n    <mta-navbar></mta-navbar>\n    <div class=\"container\"><router-outlet></router-outlet></div>\n    ",
                        directives: [
                            router_6.ROUTER_DIRECTIVES,
                            navbar_component_1.NavbarComponent
                        ],
                        providers: [
                            icon_1.MdIconRegistry,
                            data_service_ts_1.DataService,
                            auth_service_5.AuthService,
                            posts_service_3.PostsService
                        ]
                    }),
                    router_6.Routes([
                        {
                            // TODO: no way to add default route now
                            path: '',
                            component: login_component_1.LoginComponent
                        },
                        {
                            path: '/login',
                            component: login_component_1.LoginComponent
                        },
                        {
                            path: '/signup',
                            component: signup_component_1.SignupComponent
                        },
                        {
                            path: '/dashboard',
                            component: dashboard_component_1.DashboardComponent
                        },
                        {
                            path: '/posts/new',
                            component: postEdit_component_1.PostEditComponent
                        },
                        {
                            path: '/posts/:postId',
                            component: postEdit_component_1.PostEditComponent
                        },
                        {
                            path: '*',
                            component: login_component_1.LoginComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [router_6.Router, ng2_translate_6.TranslateService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_9("AppComponent", AppComponent);
        }
    }
});
System.register("main", ['@angular/platform-browser-dynamic', '@angular/http', '@angular/router', 'ng2-translate/ng2-translate', "app/app.component"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var platform_browser_dynamic_1, http_2, router_7, ng2_translate_7, app_component_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (router_7_1) {
                router_7 = router_7_1;
            },
            function (ng2_translate_7_1) {
                ng2_translate_7 = ng2_translate_7_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
                http_2.HTTP_PROVIDERS,
                router_7.ROUTER_PROVIDERS,
                ng2_translate_7.TRANSLATE_PROVIDERS
            ]);
        }
    }
});
//# sourceMappingURL=index.module.js.map