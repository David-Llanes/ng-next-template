import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MenuItem } from '@core/config/nav-bar-items';

@Component({
  selector: 'a[app-navbar-link]',
  imports: [NgClass],
  template: `
    <div class="grid size-[var(--sidebar-item-size)] place-content-center p-1.5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="size-full max-h-6 max-w-6"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M15 8h.01" />
        <path d="M4 15l4 -4c.928 -.893 2.072 -.893 3 0l5 5" />
        <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l2 2" />
        <path d="M3 12a9 9 0 0 0 9 9a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9" />
      </svg>
    </div>
    <p
      [ngClass]="isCollapsed() ? 'opacity-0' : 'opacity-100'"
      class="truncate pr-2 text-nowrap transition-[opacity] duration-200"
    >
      {{ item().key }}
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'grid h-[var(--sidebar-item-size)] w-full grid-cols-[var(--sidebar-item-size)_auto] items-center',
  },
})
export class NavbarLinkComponent {
  item = input.required<MenuItem>();
  isCollapsed = input<boolean>();
}
