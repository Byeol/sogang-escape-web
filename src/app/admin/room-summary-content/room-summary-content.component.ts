import { Component, Input } from '@angular/core';
import { RoomAnswer } from 'app/rooms/shared/room-answer';
import { RoomCount } from 'app/rooms/shared/room-count';
import { RoomOperation } from 'app/rooms/shared/room-operation';

@Component({
  selector: 'app-room-summary-content',
  templateUrl: './room-summary-content.component.html',
  styleUrls: ['./room-summary-content.component.css']
})
export class RoomSummaryContentComponent {
  @Input() count: RoomCount;
  @Input() answers: RoomAnswer[];
  @Input() operations: RoomOperation[];

  get answersLabel() {
    return `Answers${(this.count && this.count.answersCount) ? ` (${this.count.answersCount})` : ''}`;
  }

  get operationsLabel() {
    return `Operations${(this.count && this.count.operationsCount) ? ` (${this.count.operationsCount})` : ''}`;
  }
}
