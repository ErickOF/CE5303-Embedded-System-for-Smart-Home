import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'ngx-modal-overlays',
  template: `
    <router-outlet></router-outlet>
  `,
})

export class ModalOverlaysComponent {
}
