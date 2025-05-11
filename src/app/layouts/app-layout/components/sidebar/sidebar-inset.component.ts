import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LayoutService } from '@core/services/layout.service';

@Component({
  selector: 'app-sidebar-inset',
  imports: [],
  template: ` <ng-content /> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'bg-background relative flex w-full flex-1 overflow-hidden transition-[margin] duration-200 md:peer-data-[layout=row]:peer-data-[variant=inset]:ml-2 md:peer-data-[layout=row]:peer-data-[variant=inset]:mt-2 md:peer-data-[layout=row]:peer-data-[variant=inset]:rounded-tl-xl md:peer-data-[layout=row]:peer-data-[variant=inset]:shadow-sm',
    '[class.flex-col]': 'layoutMode() !== "col"',
  },
})
export class SidebarInsetComponent {
  private layoutService = inject(LayoutService);

  layoutMode = this.layoutService.layoutMode;
}
