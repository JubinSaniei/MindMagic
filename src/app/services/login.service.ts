import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Settings } from '../shared/settings';


@Injectable()
export class LoginService {
    constructor(private http: HttpClient) {
    }

    login(data): Observable<string> {
        return this.http.post(Settings.getSettings().apiUrl.concat('user/login'), data, { responseType: 'text' });
    }
}

