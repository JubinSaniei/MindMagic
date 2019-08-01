import { Component, OnInit, NgModule, ViewChild, ElementRef } from '@angular/core';
import { CardService } from '../../services/card.service';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpResponseMessageHandler } from 'src/app/shared/httpResponse.msg.handeler';

declare const $: any;

@NgModule({
  declarations: [
    CardsComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule
  ],
  providers: []
})


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @ViewChild('frmUpdate', { static: true }) frmUpdate: NgForm;
  @ViewChild('inputel', { static: true }) inputel: ElementRef;
  @ViewChild('frmNewCard', { static: true }) frmNewCard: NgForm;
  @ViewChild('btnUpdateClose', { static: true }) btnUpdateClose: ElementRef;

  storedUrlData = null;
  userId: any = {};
  cardName: any = {};
  selectedCard: any = {};
  newCardModel: any = {};
  show = false;
  deletedCard: '';
  updateModel: any = {};
  UpdateClicked: any = {};
  allCards: Array<any> = [];
  selectedStage = '';
  stage1: any = [];
  stage2: any = [];
  stage3: any = [];
  stage4: any = [];
  stage5: any = [];
  stage6: any = [];
  stage7: any = [];
  stage1Count: number;
  stage2Count: number;
  stage3Count: number;
  stage4Count: number;
  stage5Count: number;
  stage6Count: number;
  stage7Count: number;
  examCard: any = {};
  answerStatus: Boolean = true;
  resultStatus: Boolean;

  constructor(private cardServices: CardService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => { this.storedUrlData = params; });
  }

  ngOnInit() {
    this.routedUrl();
    this.getAllCardSets();
  }

  close() {
    this.show = false;
  }

  routedUrl() {
    if (Object.entries(this.storedUrlData).length === 0) {
      return;
    }
    this.userId = this.storedUrlData._id;
    this.cardName = this.storedUrlData.cardName;
  }

  getAllCardSets() {
    const ref = {
      '_id': this.userId,
      'cardName': this.cardName
    };

    this.cardServices.allCardSet(ref).subscribe(data => {
      for (let index = 0; index < data.deck.length; index++) {
        const element = data.deck[index];
        if (element.cardName === this.storedUrlData.cardName) {
          this.selectedCard = {
            cardName: element.cardName,
            cardSet: element.cardSet
          };
        }
      }
    });
  }

  onNewCard() {
    const ref = {
      '_id': this.userId,
      'cardName': this.cardName,
      'frontSide': this.newCardModel.frontSide,
      'backSide': this.newCardModel.backSide
    };
    this.cardServices.newCard(ref).subscribe(data => {
      this.frmNewCard.reset();
      this.inputel.nativeElement.focus();
      this.getAllCardSets();
    }, err => {
      HttpResponseMessageHandler.ErrorMsg(err);
    });
  }

  onDeleteCard(e, event) {
    if (!e) {
      return;
    }
    const ref = {
      '_id': this.userId,
      'cardName': this.cardName,
      'card_id': event.card_id
    };

    this.cardServices.deleteCard(ref).subscribe(data => {
      this.deletedCard = event.frontSide;
      this.show = true;
      this.getAllCardSets();
    }, err => {
      HttpResponseMessageHandler.ErrorMsg(err);
    });
  }

  onUpdateClicked(data) {
    this.UpdateClicked = { card_id: data.card_id, stage: data.stage, frontSide: data.frontSide, backSide: data.backSide };
  }

  onUpdateCard() {
    const ref = {
      _id: this.userId,
      cardName: this.cardName,
      frontSide: this.UpdateClicked.frontSide,
      backSide: this.UpdateClicked.backSide,
      card_id: this.UpdateClicked.card_id,
      stage: this.UpdateClicked.stage
    };
    this.cardServices.updateCard(ref).subscribe(data => {
      this.frmUpdate.reset();
      this.btnUpdateClose.nativeElement.click();
      this.getAllCardSets();
    }, err => {
      HttpResponseMessageHandler.ErrorMsg(err);
    });
  }

  async getallCards() {
    return new Promise((resolve, reject) => {
      this.cardServices.getAllCards(this.userId).subscribe(data => {

        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          if (element.cardName === this.cardName) {
            this.stage1Count = element.stage1Count;
            this.stage1 = element.stage1;

            this.stage2Count = element.stage2Count;
            this.stage2 = element.stage2;

            this.stage3Count = element.stage3Count;
            this.stage3 = element.stage3;

            this.stage4Count = element.stage4Count;
            this.stage4 = element.stage4;

            this.stage5Count = element.stage5Count;
            this.stage5 = element.stage5;

            this.stage6Count = element.stage6Count;
            this.stage6 = element.stage6;

            this.stage7Count = element.stage7Count;
            this.stage7 = element.stage7;
          }
        }
        resolve();
      });
    });
  }
  async onStageClicked(value) {
    this.selectedStage = value;
    if (value === 'stage1') {
      if (!this.stage1[0]) {
        this.examCard = {};
        return;
      }
      this.answerStatus = true;
      this.examCard = this.stage1[0];
    } else if (value === 'stage2') {
      if (!this.stage2[0]) {
        this.examCard = {};
        return;
      }
      this.answerStatus = true;
      this.examCard = this.stage2[0];
    } else if (value === 'stage3') {
      if (!this.stage3[0]) {
        this.examCard = {};
        return;
      }
      this.answerStatus = true;
      this.examCard = this.stage3[0];
    } else if (value === 'stage4') {
      if (!this.stage4[0]) {
        this.examCard = {};
        return;
      }
      this.answerStatus = true;
      this.examCard = this.stage4[0];
    } else if (value === 'stage5') {
      if (!this.stage5[0]) {
        this.examCard = {};
        return;
      }
      this.answerStatus = true;
      this.examCard = this.stage5[0];
    } else if (value === 'stage6') {
      if (!this.stage6[0]) {
        this.examCard = {};
        return;
      }
      this.answerStatus = true;
      this.examCard = this.stage6[0];
    } else if (value === 'stage7') {
      if (!this.stage7[0]) {
        this.examCard = {};
        return;
      }
      this.answerStatus = true;
      this.examCard = this.stage7[0];
    }
  }

  onShowAnswer() {
    this.answerStatus = !this.answerStatus;
  }

  onResult(x) {
    if (x === 'true') {
      this.resultStatus = true;
    } else {
      this.resultStatus = false;
    }
    const schema = {
      _id: this.userId,
      cardName: this.cardName,
      card_id: this.examCard.card_id,
      frontSide: this.examCard.frontSide,
      backSide: this.examCard.backSide,
      stage: this.examCard.stage,
      result: this.resultStatus
    };
    this.cardServices.updateCard(schema).subscribe(async data => {
      this.examCard = {};
      this.stage2 = [];
      await this.getallCards();
      await this.onStageClicked(this.selectedStage);
    }, err => {
      HttpResponseMessageHandler.ErrorMsg(err);
    });
  }
}
