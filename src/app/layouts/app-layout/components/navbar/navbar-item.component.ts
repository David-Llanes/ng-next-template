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

@Component({
  selector: 'app-navbar-item',
  imports: [RouterLink, NgClass],
  template: `
    @let localItem = item();

    <li class="list-none overflow-hidden">
      @if (localItem.isLink) {
        <a
          [routerLink]="localItem.routerLink"
          class="hover:bg-muted mb-1 flex items-center gap-1 overflow-hidden rounded-lg p-2"
        >
          <!-- <i [class]="localItem.icon + ' w-5 shrink-0'"></i> -->
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
            class="size-5 shrink-0"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 8h.01" />
            <path d="M4 15l4 -4c.928 -.893 2.072 -.893 3 0l5 5" />
            <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l2 2" />
            <path d="M3 12a9 9 0 0 0 9 9a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9" />
          </svg>
          <span class="line-clamp-1 grow">{{ localItem.key }}</span>
        </a>
      }

      @if (localItem.items?.length) {
        <div
          class="grid grid-rows-[auto_0fr] content-start transition-all"
          [ngClass]="{
            'grid-rows-[auto_1fr]': isOpen() && !isCollapsed(),
          }"
        >
          <div
            class="h-[calc(var(--sidebar-width-icon)-var(--sidebar-padding-expanded))] w-full overflow-hidden rounded-lg p-[5px]"
          >
            <div
              class="flex size-full items-center justify-start gap-2 overflow-hidden rounded-lg"
            >
              <!-- <i [class]="localItem.icon + ' w-5 shrink-0'"></i> -->
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
                class="size-[calc(var(--sidebar-width-icon)-var(--icon-size))] shrink-0"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 8h.01" />
                <path d="M4 15l4 -4c.928 -.893 2.072 -.893 3 0l5 5" />
                <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l2 2" />
                <path
                  d="M3 12a9 9 0 0 0 9 9a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9"
                />
              </svg>

              <div class="flex flex-1 items-center overflow-hidden">
                <span class="line-clamp-1 flex-1">{{ localItem.key }}</span>

                <button
                  class="flex size-5 cursor-pointer items-center justify-center overflow-hidden"
                  [ngClass]="{ 'rotate-90': isOpen() }"
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
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 6l6 6l-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

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
