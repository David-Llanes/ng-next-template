import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LayoutService } from '@core/services/layout.service';
import { SidebarService } from '@core/services/sidebar.service';

@Component({
  selector: 'app-sidebar-provider',
  imports: [],
  template: ` <ng-content /> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'group/sidebar-wrapper has-[[data-variant=inset]]:bg-sidebar flex h-svh w-full',
    '[class.flex-col]': 'layoutMode() === "col"',
    '[style.--topbar-height]': '"3.5rem"',
    '[style.--sidebar-width]': '"16rem"',
    '[style.--sidebar-width-icon]': '"3rem"',
    '[style.--sidebar-item-size]': '"2rem"',
    '[style.--sidebar-padding-collapsed]':
      '"calc((var(--sidebar-width-icon) - var(--sidebar-item-size)) / 2)"',
    '[style.--sidebar-padding-expanded]': '"0.5rem"',
    '[style.--sidebar-padding]':
      'isCollapsed() ? "var(--sidebar-padding-collapsed)" : "var(--sidebar-padding-expanded)"',
  },
})
export class SidebarProviderComponent {
  private layoutService = inject(LayoutService);
  private sidebarService = inject(SidebarService);

  isCollapsed = this.sidebarService.isStaticCollapsed;
  layoutMode = this.layoutService.layoutMode;
}
