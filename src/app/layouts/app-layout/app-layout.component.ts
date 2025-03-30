import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NgClass, NgTemplateOutlet } from '@angular/common';
import { AppLayoutService } from './app-layout.service';
import { SidebarComponent } from './components/sidebar.component';
import { TopbarComponent } from './components/topbar.component';

// TODO: SEGUIR MEJORANDO LOS SERVICIOS Y METERLE LAS CLASES AL ASIDE, NO AL app-sidebar
@Component({
  selector: 'app-app-layout',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, NgTemplateOutlet, NgClass],
  template: `
    <ng-template #topbar>
      <app-topbar />
    </ng-template>

    <ng-template #sidebar>
      <app-sidebar [attr.data-mode]="layoutMode()" />
    </ng-template>

    <ng-template #main>
      <main class="bg-background flex h-full grow flex-col overflow-auto">
        <router-outlet />
      </main>
    </ng-template>

    @defer (when layoutReady()) {
      <!-- XD -->
      <div
        style="--sidebar-width:16rem; --sidebar-width-icon:3rem; --topbar-height:4rem;"
        class="group flex h-svh w-full overflow-hidden"
        [ngClass]="{ 'flex-col': layoutMode() === 'col' }"
      >
        <ng-container [ngTemplateOutlet]="outerComponent()!" />

        <div
          class="flex flex-1 overflow-hidden"
          [ngClass]="{ 'flex-col': layoutMode() === 'row' }"
        >
          <ng-container [ngTemplateOutlet]="innerComponent()!" />
          <ng-container [ngTemplateOutlet]="content()" />
        </div>
      </div>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayoutComponent {
  layoutService = inject(AppLayoutService);

  layoutMode = this.layoutService.layoutMode;

  sidebar = viewChild.required<TemplateRef<unknown>>('sidebar');
  topbar = viewChild.required<TemplateRef<unknown>>('topbar');
  content = viewChild.required<TemplateRef<unknown>>('main');

  outerComponent = computed(() => {
    if (this.layoutMode() === undefined) return undefined;

    if (this.layoutMode() === 'col') {
      return this.topbar();
    } else {
      return this.sidebar();
    }
  });

  innerComponent = computed(() => {
    if (this.layoutMode() === undefined) return undefined;

    if (this.layoutMode() === 'col') {
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
