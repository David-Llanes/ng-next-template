import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  TemplateRef,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NgClass, NgTemplateOutlet } from '@angular/common';
import { AppLayoutService } from './app-layout.service';
import { SidebarComponent } from './components/sidebar.component';
import { TopbarComponent } from './components/topbar.component';

@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, NgTemplateOutlet, NgClass],
  template: `
    <ng-template #topbar>
      <app-topbar class="z-50 shrink-0 border-b" />
    </ng-template>

    <ng-template #sidebar>
      <app-sidebar class="outline-border z-100 outline" />
    </ng-template>

    <ng-template #main>
      <main class="bg-background flex h-full grow flex-col overflow-auto">
        <router-outlet />
      </main>
    </ng-template>

    @defer (when layoutReady()) {
      <!-- XD -->
      <div
        class="isolate flex h-svh max-h-svh overflow-hidden"
        [ngClass]="{ 'flex-col': stickyHeader() }"
      >
        <ng-container [ngTemplateOutlet]="outerComponent()!" />

        <div
          class="flex flex-1 overflow-hidden"
          [ngClass]="{ 'flex-col': !stickyHeader() }"
        >
          <ng-container [ngTemplateOutlet]="innerComponent()!" />
          <ng-container [ngTemplateOutlet]="content()" />
        </div>
      </div>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppLayoutComponent {
  layoutService = inject(AppLayoutService);

  stickyHeader = this.layoutService.stickyHeader;

  sidebar = viewChild.required<TemplateRef<unknown>>('sidebar');
  topbar = viewChild.required<TemplateRef<unknown>>('topbar');
  content = viewChild.required<TemplateRef<unknown>>('main');

  outerComponent = computed(() => {
    if (this.stickyHeader() === undefined) return undefined;

    if (this.stickyHeader()) {
      return this.topbar();
    } else {
      return this.sidebar();
    }
  });

  innerComponent = computed(() => {
    if (this.stickyHeader() === undefined) return undefined;

    if (this.stickyHeader()) {
      return this.sidebar();
    } else {
      return this.topbar();
    }
  });

  layoutReady = computed(() => {
    if (
      this.layoutService.layoutConfig() &&
      this.innerComponent() &&
      this.outerComponent()
    ) {
      return true;
    }

    return false;
  });
}

// ? SIEMPRE QUE SE USA <router-outlet/>, si el padre tiene flex, debe de ser flex-col.
// ? ¿POR QUE?. Porque RouterOurlet renderiza un elemento vacio y como hermano renderiza el contenido del slot.
// ? Ademas, se recomienza que el componente que se renderizara en el routerOutlet tenga en host: "{ class: 'grow' }" o "{ class: 'flex-1' }"
