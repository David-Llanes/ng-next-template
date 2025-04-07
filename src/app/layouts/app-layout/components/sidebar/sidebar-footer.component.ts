import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-footer',
  imports: [],
  template: ` <ng-content /> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'flex flex-col gap-2 p-[var(--sidebar-padding)] transition-[padding] duration-200',
    '[attr.data-sidebar]': '"footer"',
  },
})
export class SidebarFooterComponent {}
