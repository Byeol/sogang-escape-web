import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { RoomAnswer } from 'app/rooms/shared/room-answer';
import { RoomOperation } from 'app/rooms/shared/room-operation';

@Component({
  selector: 'app-room-operations',
  templateUrl: './room-operations.component.html',
  styleUrls: ['./room-operations.component.css']
})
export class RoomOperationsComponent implements OnChanges, AfterViewInit {
  @Input() operations: RoomOperation[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource<RoomOperation>();
  displayedColumns = ['timestamp', 'numberA', 'numberB'];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.operations && changes.operations.currentValue) {
      this.dataSource.data = changes.operations.currentValue;
    }
  }
}
