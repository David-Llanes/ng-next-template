import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-content',
  imports: [],
  template: ` <ng-content /> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
    '[attr.data-sidebar]': '"content"',
  },
})
export class SidebarContentComponent {}
