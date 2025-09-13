import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  items: MenuItem[] = [];
  mobileSidebar = false;

  ngOnInit() {
    this.items = [
      {
        label: 'ABMs',
        icon: 'pi pi-folder',
        items: [
          {
            label: 'Productos',
            icon: 'pi pi-box',
            routerLink: ['/products']
          },
          {
            label: 'Clientes',
            icon: 'pi pi-users',
            routerLink: ['/customers']
          },
          {
            label: 'Ordenes',
            icon: 'pi pi-box',
            routerLink: ['/orders']
          }
        ]
      }
    ];
  }
}
