import { Component,OnInit,inject } from '@angular/core';

import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BannerComponent } from '../banner/banner.component';
import { RouterLink } from '@angular/router';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage,BannerComponent,FooterComponent,HeaderComponent,CommonModule,FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit{
  posts = inject(PostService);

  ngOnInit(): void {
    this.posts.getAllPosts().subscribe({
      next:value=>{
        console.log(value);
        this.posts.allPosts=value;
      },
      error: (error) => console.log(error),
    });
  }

}
