import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { RoomAnswer } from 'app/rooms/shared/room-answer';

@Component({
  selector: 'app-room-answers',
  templateUrl: './room-answers.component.html',
  styleUrls: ['./room-answers.component.css']
})
export class RoomAnswersComponent implements OnChanges, AfterViewInit {
  @Input() answers: RoomAnswer[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<RoomAnswer>();
  displayedColumns = ['timestamp', 'answer'];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.answers && changes.answers.currentValue) {
      this.dataSource.data = changes.answers.currentValue;
    }
  }
}
