import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Settings } from '../shared/settings';


@Injectable()
export class LoginService {
    private header: HttpHeaders;
    constructor(private http: HttpClient) {
        this.header = new HttpHeaders().set('x-auth-token', window.sessionStorage.getItem('token'));
    }

    login(data): Observable<string> {
        return this.http.post(Settings.getSettings().apiUrl.concat('user/login'), data, { responseType: 'text' });
    }


    // save(data): Observable<any> {
    //     return this.http.post(Settings.getSettings().apiUrl.concat('user/save'), data, { headers: this.header, responseType: 'text' });
    // }
    // update(data): Observable<any> {
    //     return this.http.post(Settings.getSettings().apiUrl.concat('user/update'), data, { headers: this.header, responseType: 'text' });
    // }
}

