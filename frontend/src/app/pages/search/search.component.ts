import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink,Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../../post.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule,RouterLink,FooterComponent,HeaderComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  allPosts: any;
  searchInput: string='';
  filteredPosts: any;

  constructor(public postService: PostService, public router: Router) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((posts: any) => {
      this.allPosts = posts;
      this.filteredPosts = posts;
    });
  }
  searchPosts() {
    if (this.searchInput.trim() === '') {
      // If search input is empty, show all posts
      this.filteredPosts = this.allPosts;
    } else {
      // Filter posts based on search input
      this.filteredPosts = this.allPosts.filter((post: any) =>
        post.title.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    }
  }
}
