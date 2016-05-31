import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { DataService } from './data.service';

@Injectable()
export class PostsService {
    postsUrl = 'api/posts';

    constructor(private dataService: DataService) { }

    getPosts() {
        const query = {
            _sort: 'created',
            _order: 'DESC'
        };

        return this.dataService.get(this.postsUrl, query)
            .map(res => {
                const parsed = res.map(item => {
                    return {
                        id: item.id,
                        title: item.title,
                        contents: item.contents,
                        created: Date.parse(item.created)
                    };
                })
                return parsed;
            });
    }
    
    getPost(id: number) {
        return this.dataService.get(`${this.postsUrl}/${id}`)
    }

    save(data: any) {
        // TODO: you won't create a 'created' from client in production
        let postData = Object.assign({}, data, { created: new Date() });
        return this.dataService.save(this.postsUrl, postData);
    }

    deletePost(id: number) {
        return this.dataService.delete(`${this.postsUrl}/${id}`);
    }

}
