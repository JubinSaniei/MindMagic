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
    // get all cards related to user
    getAllCards(id): Observable<any> {
        return this.http.get(Settings.getSettings().apiUrl.concat(`user/cards/getallcards/${id}`), { headers: this.header });
    }
    // Add new card
    newDeck(data): Observable<any> {
        // tslint:disable-next-line: max-line-length
        return this.http.post(Settings.getSettings().apiUrl.concat(`user/cards/newDeck`), data, { headers: this.header, responseType: 'text' });
    }

    // Delete the card
    deletDeck(data): Observable<any> {
        // tslint:disable-next-line: max-line-length
        return this.http.post(Settings.getSettings().apiUrl.concat(`user/cards/deleteDeck`), data, { headers: this.header, responseType: 'text' });
    }

    // save new cards related to user
    newCard(data): Observable<any> {
        return this.http.post(Settings.getSettings().apiUrl.concat(`user/cards/addNew`), data, { headers: this.header, responseType: 'text' });
    }

    // get all cards related to user
    allCardSet(data): Observable<any> {
        return this.http.post(Settings.getSettings().apiUrl.concat(`user/cards/getAllCardSets`), data, { headers: this.header });
    }

    // Delete a card related to user
    deleteCard(data): Observable<any> {
        return this.http.post(Settings.getSettings().apiUrl.concat(`user/cards/stages/deleteStageCard`), data, { headers: this.header, responseType: 'text' });
    }

    // Update a card related to user
    updateCard(data): Observable<any> {
        return this.http.post(Settings.getSettings().apiUrl.concat(`user/cards/stages/updateCard`), data, { headers: this.header, responseType: 'text' });
    }

}
