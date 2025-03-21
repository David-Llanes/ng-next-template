import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AppLayoutService } from '../app-layout.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  template: `
    <aside>
      @if (isSidebarCollapsed()) {
        <div class="font-bold text-red-500">Icons Here</div>
      } @else {
        <div>Sidebar Content Here</div>
      }
      <a routerLink="settings" class="cursor-pointer font-bold text-nowrap"
        >IR A SETTINGS</a
      >
    </aside>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private layoutService = inject(AppLayoutService);

  isSidebarCollapsed = computed(() => this.layoutService.isSidebarCollapsed());
}
