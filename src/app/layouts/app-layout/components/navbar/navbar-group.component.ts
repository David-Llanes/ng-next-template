import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { MenuItem } from '@core/config/nav-bar-items';
import { SidebarService } from '@core/services/sidebar.service';
import { NavbarItemComponent } from './navbar-item.component';

@Component({
  selector: 'app-navbar-group',
  imports: [NavbarItemComponent, NgClass],
  template: `
    <span
      class="text-muted-foreground list-none overflow-hidden text-[10px] font-bold uppercase transition-all duration-200"
      [ngClass]="
        isCollapsed() ? 'max-h-0 py-0 opacity-0' : 'mt-4 mb-1 max-h-8 opacity-100'
      "
    >
      {{ groupTitle() }}
    </span>

    <ul class="grid">
      @for (item of items(); track item.key) {
        <app-navbar-item [item]="item" />
      }
    </ul>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'grid',
  },
})
export class NavbarGroupComponent {
  sidebarService = inject(SidebarService);

  isCollapsed = computed(() => this.sidebarService.isStaticCollapsed());

  groupTitle = input<string>();
  items = input<MenuItem[]>([]);
}
