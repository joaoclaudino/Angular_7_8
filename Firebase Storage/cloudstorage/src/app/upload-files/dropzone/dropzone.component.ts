import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.css']
})
export class DropzoneComponent implements OnInit {

  isDraggingOver = false;

  @Output() droppedfiles = new EventEmitter<FileList>();
  constructor() { }

  ngOnInit() {
  }

  onDragOverEvent(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOver = true;
  }

  onDragLeaveEvent(event: DragEvent) {
    event.preventDefault();
    this.isDraggingOver = false;
  }

  onDropEvent(event: DragEvent) {
    event.preventDefault();
    this.droppedfiles.emit(event.dataTransfer.files);
  }

}
