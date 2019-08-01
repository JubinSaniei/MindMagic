import { Component, OnInit, NgModule, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardService } from 'src/app/services/card.service';
import { TokenDecode } from 'src/app/shared/tokenDecoder';
import { HttpResponseMessageHandler } from 'src/app/shared/httpResponse.msg.handeler';
import { Router, NavigationExtras } from '@angular/router';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: []
})

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  @ViewChild('frmNewCard', { static: true }) frmNewCard: NgForm;
  @ViewChild('newCardClose', { static: true }) newCardClose: ElementRef;

  tokenModel: any = {};
  cardsModel: Array<any> = [];
  newCardName = '';
  newCardModel = {};
  delCardModel = {};

  constructor(private cardServices: CardService, private router: Router) { }

  ngOnInit() {
    this.tokenModel = TokenDecode.getDecodedAccessToken();
    this.getAllCards();
  }

  getAllCards() {
    // receive all cards for active user.

    this.cardServices.getAllCards(this.tokenModel._id).subscribe(data => {
      this.cardsModel = data;
    });
  }

  onNewDeckSave() {
    // read data from input and send it to backend. if there was any error then HttpResponseMessageHandler will show it to the user.

    this.newCardModel = { cardName: this.newCardName, _id: this.tokenModel._id };
    this.frmNewCard.reset();
    this.newCardClose.nativeElement.click();

    this.cardServices.newDeck(this.newCardModel).subscribe(data => {
      this.getAllCards();
    }, err => {
      HttpResponseMessageHandler.ErrorMsg(err);
    });
  }

  onDeleteDeck(e: boolean, cardName) {
    // if No, then function not executed
    if (!e) {
      return;
    }
    // delete the card after user accepted and refresh the table
    this.delCardModel = { cardName: cardName, _id: this.tokenModel._id };
    this.cardServices.deletDeck(this.delCardModel).subscribe(data => {
      this.getAllCards();
    });
  }

  onViewClick(data) {
    // Set and hide the URIError, route to card page. navigationExtras is posting from url to cards.components
    const navigationExtras: NavigationExtras = {
      queryParams: {
        '_id': this.tokenModel._id,
        'cardName': data.cardName
      }, skipLocationChange: true
    };
    // user directed to the card page.
    this.router.navigate(['cards'], navigationExtras);
  }

}
