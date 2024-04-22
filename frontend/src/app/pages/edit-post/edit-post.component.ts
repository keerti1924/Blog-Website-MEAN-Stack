import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostService } from '../../post.service';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [FormsModule, HeaderComponent, RouterLink],
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  auth = inject(AuthService);
  router = inject(ActivatedRoute);
  post = inject(PostService);
  @ViewChild('editPost') ediForm!: NgForm;
  selectedFile!: File;
  postId: any;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile.name);
  }
  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      const postId = params.get('id');
      this.postId = postId;
      console.log(postId);
      this.post.getSinglePost(postId).subscribe({
        next: (value) => {
          this.post.singlePost = value;
          console.log(this.post.singlePost);
        },
        error: (error) => console.log(error),
      });
    });
  }

  editForm() {
    const formData = new FormData();
    formData.append('title', this.ediForm.value.title);
    formData.append('content', this.ediForm.value.content);
    formData.append('categories', this.ediForm.value.categories);
    formData.append('file', this.selectedFile);
    this.post.editPost(this.postId, formData);
    this.ediForm.reset();
  }

 

}
