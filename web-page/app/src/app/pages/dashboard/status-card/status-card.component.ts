import { Component, Input } from '@angular/core';

import { LightsService } from '../../../services/lights/lights.service';
import { DoorsService } from '../../../services/doors/doors.service';



@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="type == 'primary' ? this.change_light_state() : this.get_door_state()" [ngClass]="{'off': !on}">
      <div class="icon-container">
        <div class="icon status-{{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title h5">{{ title }}</div>
        <div class="status paragraph-2">{{ on ? (type == 'primary' ? 'On' : 'Open') : (type == 'primary' ? 'Off' : 'Close') }}</div>
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {
  @Input() title: string;
  @Input() type: string;
  @Input() on = false;
  @Input() value: string;

  constructor(
    public lightService: LightsService,
    public doorService: DoorsService,
  ) {
    if (this.type !== 'primary') {
      this.get_door_state();
    }
  }

  public change_light_state() {
    this.lightService.change_light_state(this.value, this.on ? 0 : 1)
      .subscribe((response) => {
        if (!response['error']) {
          this.on = !this.on;
        }
      });
  }

  public get_door_state() {
    this.doorService.get_door_state(this.value)
      .subscribe((response) => {
        if (!response['error']) {
          this.on = response['data']['state'] !== 0;
        }
      });
  }
}
