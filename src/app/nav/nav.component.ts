import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { Subscription } from 'rxjs';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [
    Menubar,
    Menu,
    ButtonModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    Ripple,
    CommonModule,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [
    {
      label: 'Add Expense',
      icon: 'pi pi-plus',
    },
  ];
  profileItems: MenuItem[] = [
    {
      label: 'User Profile',
      items: [
        {
          label: 'Personal Imformation',
          icon: 'pi pi-id-card',
          command: () => this.openPersonalInformation(),
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => this.logout(),
        },
      ],
    },
  ];

  userLogginIn: boolean;
  private subscription: Subscription;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.userLogginIn = localStorage.getItem('UserId') ? true : false;
    }
    this.commonService.loginNav$.subscribe(() => {
      if (isPlatformBrowser(this.platformId)) {
        if (localStorage.getItem('UserId')) {
          this.userLogginIn = true;
        } else {
          this.userLogginIn = false;
        }
      }
    });
  }

  constructor(
    private commonService: CommonService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  openPersonalInformation() {
    console.log('personal info');
    this.commonService.sendMessageProfile(true);
  }

  logout() {
    this.router.navigate(['/login']);
    this.userLogginIn = false;
    localStorage.clear();
  }

  openAddExpenseDialog(): void {
    console.log('activated');
    this.commonService.sendMessageAddExpense(true);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe(); // ✅ Prevents memory leaks
    }
  }
}
