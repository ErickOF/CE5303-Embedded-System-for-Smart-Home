import { Component, Input, OnInit } from '@angular/core';

import { LightsService } from '../../../services/lights/lights.service';
import { DoorsService } from '../../../services/doors/doors.service';



@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="type == 'primary' ? this.changeLightState() : this.getDoorState()" [ngClass]="{'off': !on}">
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
export class StatusCardComponent implements OnInit {
  @Input() title: string;
  @Input() type: string;
  @Input() on = false;
  @Input() value: string;
  cont = 0;

  constructor(
    public lightService: LightsService,
    public doorService: DoorsService,
  ) { }

  ngOnInit() {
    if (this.type !== 'primary') {
      this.getDoorState();
    } else {
      this.getLightState();
    }
  }

  public changeLightState() {
    this.lightService.changeLightState(this.value, this.on ? 0 : 1)
      .subscribe((response) => {
        if (!response['error']) {
          this.on = !this.on;
        }
      });
  }

  public getDoorState() {
    this.doorService.getDoorState(this.value)
      .subscribe((response) => {
        if (!response['error']) {
          this.on = response['data']['state'] !== 0;
        }

        setTimeout(() => this.getDoorState(), 100);
      }, (error) => setTimeout(() => this.getDoorState(), 100));
  }

  public getLightState() {
    this.lightService.getLightState(this.value)
      .subscribe((response) => {
        if (!response['error']) {
          this.on = response['data']['state'] !== 0;
        }

        setTimeout(() => this.getLightState(), 100);
      }, (error) => setTimeout(() => this.getLightState(), 100));
  }
}
