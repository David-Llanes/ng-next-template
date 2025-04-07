import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LayoutService } from '@core/services/layout.service';

@Component({
  selector: 'app-sidebar-provider',
  imports: [],
  template: ` <ng-content /> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    style: '--sidebar-width:16rem; --sidebar-width-icon:3rem; --topbar-height:3.5rem;',
    class:
      'group/sidebar-wrapper has-[[data-variant=inset]]:bg-sidebar flex h-svh w-full',
    '[class.flex-col]': 'layoutMode() === "col"',
  },
})
export class SidebarProviderComponent {
  private layoutService = inject(LayoutService);

  layoutMode = this.layoutService.layoutMode;
}
