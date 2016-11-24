import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CollapseModule } from 'ng2-bootstrap/components/collapse';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { TasksService, TasksResolve } from './tasks/tasks.service';
import { AuthService, AuthGuard } from './auth.service';
import { ApiData }     from './api-data';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    LoginComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CollapseModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'tasks', component: TasksComponent, canActivate: [AuthGuard], resolve: {tasks: TasksResolve}},
      {path: '**', component: NotFoundComponent}
    ]),
    InMemoryWebApiModule.forRoot(ApiData, {delay: 100})
  ],
  providers: [AuthService, AuthGuard, TasksService, TasksResolve],
  bootstrap: [AppComponent]
})
export class AppModule {
}
