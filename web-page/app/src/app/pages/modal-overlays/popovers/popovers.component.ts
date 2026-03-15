import { Component } from '@angular/core';
import {
  NgxPopoverCardComponent, NgxPopoverFormComponent,
  NgxPopoverTabsComponent,
} from './popover-examples.component';

@Component({
  standalone: false,
  selector: 'ngx-popovers',
  styleUrls: ['./popovers.component.scss'],
  templateUrl: './popovers.component.html',
})
export class PopoversComponent {
  tabsComponent = NgxPopoverTabsComponent;
  cardComponent = NgxPopoverCardComponent;
  formComponent = NgxPopoverFormComponent;
}
