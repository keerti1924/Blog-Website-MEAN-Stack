import { Component, OnInit , inject} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PostService } from '../../post.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,RouterLink,FormsModule,CommonModule],
  templateUrl: './blogs.component.html',
})
export class BlogsComponent implements OnInit{
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