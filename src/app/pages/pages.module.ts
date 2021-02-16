import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
//  Declare all the components in this module
@NgModule({
  declarations: [],
  providers: [],
  imports: [
    PagesRoutingModule,
    HttpClientModule
  ],
})
export class PagesModule {}
