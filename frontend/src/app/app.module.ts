import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './pages/search/search.component';

@NgModule({
  declarations: [
    FooterComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule // Import FormsModule here
  ],
})
export class AppModule { }
