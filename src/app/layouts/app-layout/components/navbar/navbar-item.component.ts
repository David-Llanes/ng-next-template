import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MenuItem } from '@core/config/nav-bar-items';
import { SidebarService } from '@core/services/sidebar.service';
import { NavbarLinkComponent } from './navbar-link.component';

// TODO: ICONS SHOULD BE OPTIONAL FOR COLLAPSIBLE ITEM
// TODO: SEPARATE IN COMPONENTS
@Component({
  selector: 'app-navbar-item',
  imports: [RouterLink, RouterLinkActive, NgClass, NavbarLinkComponent],
  template: `
    @let localItem = item();
    @let isLink = localItem.isLink && !localItem.items?.length;
    @let isGroupClickable = localItem.isLink && localItem.items?.length;

    <li class="list-none overflow-hidden">
      <!-- LINK (leaf) -->
      @if (isLink) {
        <a
          app-navbar-link
          [item]="localItem"
          [showIcon]="false"
          [routerLink]="localItem.routerLink"
          routerLinkActive="text-primary hover:bg-transparent"
          [routerLinkActiveOptions]="{ exact: false }"
          class="hover:bg-accent mb-1 overflow-hidden rounded-md"
        >
        </a>
      }

      <!-- COLLAPSIBLE -->
      @if (localItem.items?.length) {
        <div
          class="group/item grid grid-rows-[auto_0fr] content-start text-sm transition-[grid-template-rows] duration-200"
          [ngClass]="{
            'grid-rows-[auto_1fr]': isOpen() && !isCollapsed(),
          }"
        >
          <!-- COLLAPSIBLE ITEM -->
          <div
            class="hover:bg-accent h-[var(--sidebar-item-size)] w-full overflow-hidden rounded-md"
          >
            <div
              class="group-has-[&_a.text-primary]/item:text-primary flex size-full items-center group-has-[&_a.text-primary]/item:font-semibold"
            >
              @if (isGroupClickable) {
                <a
                  app-navbar-link
                  [item]="localItem"
                  [isCollapsed]="isCollapsed()"
                  [routerLink]="localItem.routerLink"
                  routerLinkActive="text-primary hover:bg-transparent"
                >
                </a>
              } @else {
                <!-- TEMPORAL -->
                <section
                  class="grid flex-1 cursor-default grid-cols-[auto_1fr] items-center"
                >
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
                      <path d="M9 6l11 0" />
                      <path d="M9 12l11 0" />
                      <path d="M9 18l11 0" />
                      <path d="M5 6l0 .01" />
                      <path d="M5 12l0 .01" />
                      <path d="M5 18l0 .01" />
                    </svg>
                  </div>
                  <p
                    [ngClass]="isCollapsed() ? 'opacity-0' : 'opacity-100'"
                    class="truncate text-nowrap transition-[opacity] duration-200"
                  >
                    {{ localItem.key }}
                  </p>
                </section>
              }

              <!-- CHEVRON -->
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

          <!-- SUB-MENU -->
          <ul class="mt-1 ml-1 grid overflow-hidden border-l border-dashed pl-2">
            @for (subItem of localItem.items; track subItem.key) {
              <app-navbar-item class="" [item]="subItem"></app-navbar-item>
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
