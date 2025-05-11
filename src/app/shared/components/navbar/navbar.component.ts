import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NAVIGATION_GROUPS } from '@core/config/constants/nav-bar-items';
import { NavbarGroupComponent } from './navbar-group.component';

@Component({
  selector: 'app-navbar',
  imports: [NavbarGroupComponent],
  template: `
    @for (group of navigationGroups; track group.sectionKey) {
      <app-navbar-group [groupTitle]="group.sectionKey" [items]="group.items" />
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col h-full',
  },
})
export class NavbarComponent {
  navigationGroups = NAVIGATION_GROUPS;
}
