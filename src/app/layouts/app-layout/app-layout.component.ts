import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NgClass } from '@angular/common';
import { AppLayoutService } from './app-layout.service';
import { SidebarComponent } from './components/sidebar.component';
import { TopbarComponent } from './components/topbar.component';

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, NgClass],
  template: `
    @defer (when layoutService.layoutConfig()) {
      @if (isStickyHeader()) {
        <div class="isolate flex h-svh max-h-svh flex-col overflow-hidden">
          <app-topbar class="z-50 shrink-0 border-b" />

          <div class="flex flex-1 overflow-hidden">
            <app-sidebar class="outline-border z-100 overflow-hidden outline" />
            <main
              class="scrollbar-thin bg-background flex h-full grow flex-col overflow-auto"
            >
              <router-outlet />
            </main>
          </div>
        </div>
      } @else {
        <div
          class="isolate flex h-svh max-h-svh overflow-hidden"
          [ngClass]="
            isFloatingInset() ? 'bg-sidebar md:space-x-2 md:p-2' : 'bg-background'
          "
        >
          <app-sidebar
            class="z-100 overflow-hidden"
            [ngClass]="
              isFloatingSidebar()
                ? 'outline-border outline md:m-2 md:rounded-xl md:shadow-sm'
                : isFloatingNone()
                  ? 'outline-border outline'
                  : ''
            "
          />
          <div
            class="flex flex-1 flex-col overflow-hidden"
            [ngClass]="
              isFloatingInset()
                ? 'outline-border md:rounded-xl md:shadow-sm md:outline'
                : ''
            "
          >
            <app-topbar
              class="z-50 shrink-0"
              [ngClass]="!isFloatingSidebar() ? 'border-b' : ''"
            />
            <main
              class="scrollbar-thin bg-background flex h-full grow flex-col overflow-auto"
            >
              <router-outlet />
            </main>
          </div>
        </div>
      }
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppLayoutComponent {
  layoutService = inject(AppLayoutService);

  isStickyHeader = this.layoutService.isStickyHeader;
  floatingMode = this.layoutService.floatingMode;

  isFloatingSidebar = computed(() => this.floatingMode() === 'sidebar');
  isFloatingInset = computed(() => this.floatingMode() === 'inset');
  isFloatingNone = computed(() => this.floatingMode() === 'none');
}

// ? SIEMPRE QUE SE USA <router-outlet/>, si el padre tiene flex, debe de ser flex-col.
// ? ¿POR QUE?. Porque RouterOurlet renderiza un elemento vacio y como hermano renderiza el contenido del slot.
// ? Ademas, se recomienza que el componente que se renderizara en el routerOutlet tenga en host: "{ class: 'grow' }" o "{ class: 'flex-1' }"
