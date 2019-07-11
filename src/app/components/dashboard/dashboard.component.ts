import { Component, OnInit, NgModule, ViewChild, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardService } from 'src/app/services/card.service';
import { TokenDecode } from 'src/app/shared/tokenDecoder';

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

  @ViewChild('frmNewCard') frmNewCard: NgForm;
  @ViewChild('newCardClose') newCardClose: ElementRef;

  tokenModel: any = {};
  cardsModel: Array<any> = [];
  newCardName = '';
  newCardModel = {};
  delCardModel = {};

  constructor(private cardServices: CardService) { }

  ngOnInit() {
    this.tokenModel = TokenDecode.getDecodedAccessToken();
    this.getAllCards();
  }

  getAllCards() {

    this.cardServices.getAllCards(this.tokenModel._id).subscribe(data => {
      this.cardsModel = data;
    });
  }

  onNewCardSave() {
    this.newCardModel = { cardName: this.newCardName, _id: this.tokenModel._id };
    this.frmNewCard.reset();
    this.newCardClose.nativeElement.click();

    this.cardServices.newCard(this.newCardModel).subscribe(data => {
      this.getAllCards();
    });
  }

  onDeleteCard(e: boolean, cardName) {
    if (!e) {
      return;
    }
    this.delCardModel = { cardName: cardName, _id: this.tokenModel._id };
    this.cardServices.deleteCard(this.delCardModel).subscribe(data => {
      this.getAllCards();
    });
  }

}
