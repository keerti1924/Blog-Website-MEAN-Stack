import { Component, ViewChild, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { NgForm, FormsModule } from '@angular/forms';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule, HeaderComponent],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  post = inject(PostService);
  selectedFile!: File;

  @ViewChild('createPost') creat!: NgForm;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  creatForm() {
    const formData = new FormData();
    formData.append('title', this.creat.value.title);
    formData.append('content', this.creat.value.content);
    formData.append('categories', this.creat.value.categories);
    formData.append('file', this.selectedFile, this.selectedFile.name);

    console.log(this.creat.value);
    this.post.createPost(formData);
    this.creat.reset();
  }

}
