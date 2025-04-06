import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-header',
  imports: [],
  template: ` <ng-content /> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col gap-2 p-2',
    '[attr.data-sidebar]': '"header"',
  },
})
export class SidebarHeaderComponent {}
