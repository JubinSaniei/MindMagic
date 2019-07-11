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
        return this.http.get(Settings.getSettings().apiUrl.concat(`user/cards/getallcards/${id}`), { headers: this.header });
    }
    newCard(data): Observable<any> {
// tslint:disable-next-line: max-line-length
        return this.http.post(Settings.getSettings().apiUrl.concat(`user/cards/newcard`), data, { headers: this.header, responseType: 'text' });
    }
    deleteCard(data): Observable<any> {
// tslint:disable-next-line: max-line-length
        return this.http.post(Settings.getSettings().apiUrl.concat(`user/cards/deletecard`), data, { headers: this.header, responseType: 'text' });
    }



}
