import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChildComponent } from './child/child.component';
import { ChildDetailsComponent } from './child-details/child-details.component';
import { CustompipePipe } from './pipes/custompipe.pipe';
@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    ChildDetailsComponent,
    CustompipePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
