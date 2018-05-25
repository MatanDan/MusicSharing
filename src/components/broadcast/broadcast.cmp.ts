import { Component, Input } from '@angular/core';

@Component({
  selector: 'broadcast',
  templateUrl: 'broadcast.cmp.html'
})
export class BroadcastComponent {
  @Input() broadcaster: string;
  @Input() currentSong: string;
  @Input() membersCount: number;

  constructor() {
  }

}
