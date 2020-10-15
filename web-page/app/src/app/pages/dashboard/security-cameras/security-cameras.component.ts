import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbComponentSize, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';

import { Camera, SecurityCamerasData } from '../../../@core/data/security-cameras';

import { WebCamService } from '../../../services/web-cam/web-cam.service';


@Component({
  selector: 'ngx-security-cameras',
  styleUrls: ['./security-cameras.component.scss'],
  templateUrl: './security-cameras.component.html',
})
export class SecurityCamerasComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  cameras: Camera[];
  selectedCamera: Camera;
  isSingleView = false;
  actionSize: NbComponentSize = 'medium';
  img = 'assets/images/camera1.jpg';

  constructor(
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private securityCamerasService: SecurityCamerasData,
    private webCamService: WebCamService,
  ) {}

  ngOnInit() {
    this.securityCamerasService.getCamerasData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((cameras: Camera[]) => {
        this.cameras = cameras;
        this.selectedCamera = this.cameras[0];
      });

    const breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(map(([, breakpoint]) => breakpoint.width))
      .subscribe((width: number) => {
        this.actionSize = width > breakpoints.md ? 'medium' : 'small';
      });

    this.takePhoto();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public takePhoto() {
    this.webCamService
      .takePhoto()
      .subscribe((response) => {
        this.img = 'data:image/jpg;base64,' + btoa(new Uint8Array(response)
          .reduce((data, byte) => data + String.fromCharCode(byte), ''));
      });
  }
}
