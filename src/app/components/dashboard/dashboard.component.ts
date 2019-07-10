import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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

  tokenModel: any = {};
  cardsModel: any = {};


  constructor(private cardServices: CardService) { }

  ngOnInit() {
    this.tokenModel = TokenDecode.getDecodedAccessToken();
    this.getAllCards();
  }

  getAllCards() {

    this.cardServices.getAllCards(this.tokenModel._id).subscribe(data => {
      this.cardsModel = data.cards;
      console.log(data.cards);
      // console.log(this.cardsModel.cardName);
    });
  }

}
