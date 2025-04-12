import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, TemplateRef } from '@angular/core';

import { MenuItem } from '@core/config/nav-bar-items';

@Component({
  selector: 'a[app-navbar-link]',
  imports: [NgClass, NgTemplateOutlet],
  template: `
    <!-- TODO: QUE RECIBA POR PROPS SI MUESTRA ICONO -->
    @let withIcon = (item()?.icon || icon()) && showIcon();

    @if (withIcon) {
      <div class="grid size-[var(--sidebar-item-size)] place-content-center p-1.5">
        @if (icon()) {
          <ng-container [ngTemplateOutlet]="icon()!" />
        } @else {
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
            <path d="M9 15l6 -6" />
            <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
            <path
              d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"
            />
          </svg>
        }
      </div>
    }
    <p
      [ngClass]="{ 'pl-2': !withIcon, 'opacity-0': isCollapsed() }"
      class="truncate pr-2 text-nowrap transition-[opacity] duration-200"
    >
      {{ item()?.key ?? label() ?? '' }}
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'h-[var(--sidebar-item-size)] flex-1 grid grid-cols-[auto_1fr] items-center hover:cursor-pointer group/link',
  },
})
export class NavbarLinkComponent {
  item = input<MenuItem>();
  showIcon = input<boolean>(true);
  isCollapsed = input<boolean>();

  icon = input<TemplateRef<unknown>>();
  label = input<string>();
}
