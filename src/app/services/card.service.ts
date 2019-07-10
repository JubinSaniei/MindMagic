import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Settings } from '../shared/settings';


@Injectable()
export class CardService {
    private header: HttpHeaders;
    constructor(private http: HttpClient) {
        this.header = new HttpHeaders().set('x-auth-token', window.sessionStorage.getItem('token'));
    }

    getAllCards(id): Observable<any> {
        console.log(id);
        return this.http.get(Settings.getSettings().apiUrl.concat(`user/cards/getallcards/${id}`), { headers: this.header });
    }
}
