import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './pages/app/app.component';
import { UserCardComponent } from './pages/user-card/user-card.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { HeaderComponent } from './pages/header/header.component';
import { AboutUsComponent } from './pages/static/about-us/about-us.component';
import { ContactComponent } from './pages/static/contact/contact.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogInterceptor } from './interceptors/log.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserCardComponent,
    UserDetailComponent,
    CreateUserComponent,
    HeaderComponent,
    AboutUsComponent,
    ContactComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
