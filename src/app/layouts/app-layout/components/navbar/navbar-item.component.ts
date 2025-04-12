import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { MenuItem } from '@core/config/nav-bar-items';
import { SidebarService } from '@core/services/sidebar.service';

// TODO: ICONS SHOULD BE OPTIONAL
// TODO: SEPARATE IN COMPONENTS
@Component({
  selector: 'app-navbar-item',
  imports: [RouterLink, NgClass],
  template: `
    @let localItem = item();

    <li class="list-none overflow-hidden">
      <!-- LINK (leaf) -->
      @if (localItem.isLink) {
        <a
          [routerLink]="localItem.routerLink"
          class="hover:bg-muted mb-1 grid h-[var(--sidebar-item-size)] w-full grid-cols-[var(--sidebar-item-size)_auto] items-center overflow-hidden rounded-md"
        >
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
              <path
                d="M3 12a9 9 0 0 0 9 9a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9"
              />
            </svg>
          </div>
          <p
            [ngClass]="isCollapsed() ? 'opacity-0' : 'opacity-100'"
            class="truncate pr-2 text-nowrap transition-[opacity] duration-200"
          >
            {{ localItem.key }}
          </p>
        </a>
      }

      <!-- COLLAPSIBLE -->
      @if (localItem.items?.length) {
        <div
          class="grid grid-rows-[auto_0fr] content-start text-sm transition-[grid-template-rows] duration-200"
          [ngClass]="{
            'grid-rows-[auto_1fr]': isOpen() && !isCollapsed(),
          }"
        >
          <!-- COLLAPSIBLE ITEM -->
          <div
            class="hover:bg-accent h-[var(--sidebar-item-size)] w-full overflow-hidden rounded-md"
          >
            <div class="flex size-full items-center justify-start">
              <!-- ICON -->
              <div
                class="grid size-[var(--sidebar-item-size)] shrink-0 place-content-center p-1.5"
              >
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
                  <path
                    d="M3 12a9 9 0 0 0 9 9a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9"
                  />
                </svg>
              </div>

              <!-- TEXT AND CHEVRON -->
              <div
                class="grid h-full flex-1 grid-cols-[1fr_var(--sidebar-item-size)] items-center"
              >
                <p
                  [ngClass]="isCollapsed() ? 'opacity-0' : 'opacity-100'"
                  class="truncate text-nowrap transition-[opacity] duration-200"
                >
                  {{ localItem.key }}
                </p>

                <button
                  class="grid size-[var(--sidebar-item-size)] cursor-pointer place-content-center p-1.5"
                  [ngClass]="{ 'rotate-90': isOpen(), 'opacity-0': isCollapsed() }"
                  (click)="isOpen.set(!isOpen())"
                >
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
                    class="size-full max-h-4 max-w-4"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 6l6 6l-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- SUB-MENU -->
          <ul class="mt-1 grid overflow-hidden pl-3">
            @for (subItem of localItem.items; track subItem.key) {
              <app-navbar-item [item]="subItem"></app-navbar-item>
            }
          </ul>
        </div>
      }
    </li>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarItemComponent {
  sidebarService = inject(SidebarService);

  isCollapsed = computed(() => this.sidebarService.isStaticCollapsed());

  item = input.required<MenuItem>();

  isOpen = signal<boolean>(false);
}
