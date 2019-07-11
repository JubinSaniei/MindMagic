import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginService } from './services/login.service';
import { HomeComponent } from './components/home/home.component';
import { CardService } from './services/card.service';
import { ConfirmButtonDirective } from './shared/confirmBtn.Directive';
import { CardsComponent } from './components/cards/cards.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cards', component: CardsComponent },
  // { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    HomeComponent,
    ConfirmButtonDirective,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    NgxDatatableModule
  ],
  providers: [
    NavbarComponent,
    LoginService,
    CardService,
    CardsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
