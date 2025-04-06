import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LayoutService } from '@core/services/layout.service';
import { SidebarContainerComponent } from './components/sidebar/sidebar-container.component';
import { SidebarInsetComponent } from './components/sidebar/sidebar-inset.component';
import { SidebarProviderComponent } from './components/sidebar/sidebar-provider.component';
import { TopbarComponent } from './components/topbar.component';

@Component({
  selector: 'app-app-layout',
  imports: [
    SidebarProviderComponent,
    SidebarInsetComponent,
    SidebarContainerComponent,
    TopbarComponent,
    RouterOutlet,
  ],
  template: `
    @defer (when layoutReady()) {
      <app-sidebar-provider>
        @if (layoutMode() === 'col') {
          <app-topbar class="border-b" />
        } @else {
          <app-sidebar-container />
        }
        <app-sidebar-inset>
          @if (layoutMode() === 'col') {
            <app-sidebar-container />
          } @else {
            <app-topbar />
          }
          <main class="bg-background flex h-full grow flex-col overflow-auto">
            <router-outlet />
          </main>
        </app-sidebar-inset>
      </app-sidebar-provider>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayoutComponent {
  private layoutService = inject(LayoutService);

  layoutMode = this.layoutService.layoutMode;

  layoutReady = computed(() => !!this.layoutService.layoutConfig());
}

// ? SIEMPRE QUE SE USA <router-outlet/>, si el padre tiene flex, debe de ser flex-col.
// ? ¿POR QUE?. Porque RouterOurlet renderiza un elemento vacio y como hermano renderiza el contenido del slot.
// ? Ademas, se recomienza que el componente que se renderizara en el routerOutlet tenga en host: "{ class: 'grow' }" o "{ class: 'flex-1' }"
