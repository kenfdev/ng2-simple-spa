import { Component, OnInit } from '@angular/core';
import { 
    ROUTER_DIRECTIVES, 
    Router
} from '@angular/router';

import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_PROGRESS_CIRCLE_DIRECTIVES } from '@angular2-material/progress-circle';
import { MdInput } from '@angular2-material/input'
import { MdButton } from '@angular2-material/button';
import { TranslatePipe } from 'ng2-translate/ng2-translate';

import { PostsService } from '../shared/posts.service';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'mta-dashboard',
    templateUrl: 'src/app/dashboard/dashboard.component.html',
    directives: [
        ROUTER_DIRECTIVES,
        MD_PROGRESS_CIRCLE_DIRECTIVES,
        MD_LIST_DIRECTIVES,
        MD_CARD_DIRECTIVES,
        MdButton
    ],
    pipes: [TranslatePipe]
})
export class DashboardComponent implements OnInit {

    posts: any;

    constructor(
        private router: Router,
        private postsService: PostsService,
        private authService: AuthService
    ) { }
    
    ngOnInit() {
        this.fetchPosts();
    }

    private fetchPosts() {
        this.posts = this.postsService.getPosts()
    }

    onNewClicked() {
        this.router.navigate(['/posts/new']);
    }

    onEdit(post: any) {
        this.router.navigate([`/posts/${post.id}`])
    }

    onDelete(post: any) {
        // TODO: replace when md-dialog is ready
        if (window.confirm('削除してもいいですか？')) {
            this.postsService.deletePost(post.id)
                .subscribe(res => {
                    this.fetchPosts();
                });
        }
    }
}