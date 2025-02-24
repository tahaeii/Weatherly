import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import player from 'lottie-web';
import { HomeRoutes } from '../routes/home.routing';
import { SharedComponentsModule } from '../../shared/shared.components.module';
import { HomeComponent } from 'src/app/components/home/home.component';
import { LottieModule } from 'ngx-lottie';
import { timestamp } from 'rxjs';
import { TimestampPipe } from '../pipe/timestamp.pipe';

@NgModule({
  imports: [
    HomeRoutes,
    SharedComponentsModule,
  ],
  declarations: [
    // Declare and export components here
    HomeComponent,    
    TimestampPipe
  ],
  exports: [
    // Declare and export components here
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponentsModule { }
