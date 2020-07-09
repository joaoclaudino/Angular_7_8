import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';
import { Observable } from 'rxjs';
import { MyFile } from '../models/myfile.model';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.css']
})
export class MyFilesComponent implements OnInit {

  files: Observable<MyFile[]>;

  constructor(private filesService: FilesService) { }

  ngOnInit() {
    this.files = this.filesService.getFiles();
  }

  getDate(n) {
    return new Date(n);
  }

  delete(f: MyFile) {
    this.filesService.deleteFile(f);
  }

}
