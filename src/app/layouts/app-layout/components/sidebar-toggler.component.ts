import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AppLayoutService } from '../app-layout.service';

@Component({
  selector: 'app-sidebar-toggler',
  imports: [],
  template: `
    <div class="flex w-full justify-end">
      <button (click)="toggleSidebar()" class="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarTogglerComponent {
  private layoutService = inject(AppLayoutService);

  toggleSidebar() {
    this.layoutService.onMenuToggle();
    console.log(this.layoutService.layoutState());
  }
}
