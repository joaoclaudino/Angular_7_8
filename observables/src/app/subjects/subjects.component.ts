import { Component, OnInit } from '@angular/core';
import { Subject, ReplaySubject, AsyncSubject, BehaviorSubject } from 'rxjs';
import { GenRandomDataService } from '../gen-random-data.service';
import { DataModel } from '../datamodel';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  private subject: Subject<DataModel>;
  private replaySubJect: ReplaySubject<DataModel>;
  private asyncSubject: AsyncSubject<DataModel>;
  private behaviorSubject: BehaviorSubject<DataModel>;

  constructor(private dataService: GenRandomDataService) { }

  ngOnInit() {
    this.subject= new Subject<DataModel>();
    this.replaySubJect= new ReplaySubject<DataModel>();
    this.asyncSubject= new AsyncSubject<DataModel>();
    this.behaviorSubject= new BehaviorSubject<DataModel>({timestamp:0 , data: 0});

    this.dataService.dataObservable.subscribe(this.subject);
    this.dataService.dataObservable.subscribe(this.replaySubJect);
    this.dataService.dataObservable.subscribe(this.asyncSubject);
    this.dataService.dataObservable.subscribe(this.behaviorSubject);
    // let s: Subject<number> = new Subject<number>();
    // s.subscribe(n=>console.log(n));

    // s.next(1);
    // s.next(2);
    // s.next(3);
    // s.next(4);
    // s.complete();
  }

  connect() {
    this.dataService.dataObservable.connect();
  }
}
