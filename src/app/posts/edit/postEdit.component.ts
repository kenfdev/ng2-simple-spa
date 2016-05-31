import { Component, OnInit } from '@angular/core';
import { Router, Route, RouteSegment } from '@angular/router';
import {
    FORM_DIRECTIVES,
    FormBuilder,
    ControlGroup
} from '@angular/common';

import { MD_PROGRESS_CIRCLE_DIRECTIVES } from '@angular2-material/progress-circle';
import { MdInput } from '@angular2-material/input'
import { MdButton } from '@angular2-material/button';
import { TranslatePipe, TranslateService } from 'ng2-translate/ng2-translate';

import { PostsService } from '../../shared/posts.service';

@Component({
    selector: 'mta-post-edit',
    templateUrl: 'src/app/posts/edit/postEdit.component.html',
    directives: [MD_PROGRESS_CIRCLE_DIRECTIVES, FORM_DIRECTIVES, MdInput, MdButton],
    pipes: [TranslatePipe]
})
export class PostEditComponent implements OnInit {
    title: string;
    postId: number;
    form: ControlGroup;

    constructor(
        private router: Router,
        private routeSegment: RouteSegment,
        private fb: FormBuilder,
        private postsService: PostsService,
        private translate: TranslateService) {

        this.postId = +routeSegment.getParam('postId');

    }

    ngOnInit() {
        if (this.postId) {
            this.title = this.translate.instant('Edit Post');
            this.postsService.getPost(this.postId)
                .subscribe(res => {
                    this.form = this.fb.group({
                        id: res.id,
                        title: res.title,
                        contents: res.contents
                    })
                })
        } else {
            this.title = this.translate.instant('Create Post');
            this.form = this.fb.group({
                title: '',
                contents: ''
            })
        }
    }

    onSendPost(v) {
        this.postsService.save(v)
            .subscribe(res => {
                this.router.navigate(['/dashboard']);
            });
    }
    
    onCanceled() {
        this.router.navigate(['/dashboard']);
    }

}