import { Injectable } from '@angular/core';
import {
    Http,
    Headers,
    RequestOptions,
    URLSearchParams
} from '@angular/http';

@Injectable()
export class DataService {

    constructor(private http: Http) { }

    get(url: string, query: any = {}) {
        const params = new URLSearchParams();

        for (const key of Object.keys(query)) {
            params.set(key, query[key]);
        }

        return this.http.get(url, {
            search: params
        }).map(this.extractData);
    }
    
    save(url: string, data: any) {
        if (data.id) {
            return this.put(`${url}/${data.id}`, data);
        } else {
            return this.post(url, data);
        }
    }

    private post(url: string, data: any) {
        const body = JSON.stringify(data);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options)
            .map(this.extractData);
    }
    
    private put(url: string, data: any) {
        const body = JSON.stringify(data);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        
        return this.http.put(url, body, options)
            .map(this.extractData);
    }
    
    delete(url: string) {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        
        return this.http.delete(url);
    }

    private extractData(res: any) {
        let body = res.json();
        return body || {};
    }
}
