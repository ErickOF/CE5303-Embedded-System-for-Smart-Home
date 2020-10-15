import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';


interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  value: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  private alive = true;

  solarValue: number;
  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
    value: '',
  };
  doorCard: CardSettings = {
    title: 'Door',
    iconClass: 'nb-roller-shades',
    type: 'success',
    value: '',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    {
      ...this.lightCard,
      title: 'Living Room Light',
      value: 'living-room',
      type: 'primary',
    },
    {
      ...this.lightCard,
      title: 'Bedroom 1 Light',
      value: 'bedroom1',
      type: 'primary',
    },
    {
      ...this.lightCard,
      title: 'Bedroom 2 Light',
      value: 'bedroom2',
      type: 'primary',
    },
    {
      ...this.lightCard,
      title: 'Kitchen Light',
      value: 'kitchen',
      type: 'primary',
    },
    {
      ...this.lightCard,
      title: 'Dinning Room Light',
      value: 'other',
      type: 'primary',
    },
    {
      ...this.doorCard,
      title: 'Bedroom 1 Door',
      value: '1',
      type: 'warning',
    },
    {
      ...this.doorCard,
      title: 'Bedroom 2 Door',
      value: '2',
      type: 'warning',
    },
    {
      ...this.doorCard,
      title: 'Front Door',
      value: '3',
      type: 'warning',
    },
    {
      ...this.doorCard,
      title: 'Back Door',
      value: '4',
      type: 'warning',
    },
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: this.commonStatusCardsSet,
    dark: this.commonStatusCardsSet,
  };

  constructor(private themeService: NbThemeService,
              private solarService: SolarData) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
