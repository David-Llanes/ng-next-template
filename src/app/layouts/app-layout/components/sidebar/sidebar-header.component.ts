import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-header',
  imports: [],
  template: ` <ng-content /> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'flex flex-col gap-2 p-[var(--sidebar-padding)] transition-[padding] duration-200',
    '[attr.data-sidebar]': '"header"',
  },
})
export class SidebarHeaderComponent {}
