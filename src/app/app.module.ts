import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { SignupComponent } from './Components/signup/signup.component';
import { SigninComponent } from './Components/signin/signin.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UpdateProfileComponent } from './Components/update-profile/update-profile.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AngularMaterialModule } from './angular-material/angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './modules/user/user.component';
import { SubscriptionsComponent } from './modules/subscriptions/subscriptions.component';
import { ViewUserComponent } from './modules/view-user/view-user.component';
import { AddUserComponent } from './modules/add-user/add-user.component';

import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { DatePipe } from '@angular/common';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { WallboardComponent } from './modules/wallboard/wallboard.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {Ng2TelInputModule} from 'ng2-tel-input';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignupComponent,
    SigninComponent,
    UpdateProfileComponent,
    UserComponent,
    SubscriptionsComponent,
    ViewUserComponent,
    AddUserComponent,
    WallboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    NgxIntlTelInputModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true,
    }),
    LoadingBarModule,
    CanvasJSAngularChartsModule,
    Ng2TelInputModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi:true
  },
  DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
