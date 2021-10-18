import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user$?: Observable<any>;
  user?: any;

  routerEventSubscription!: Subscription;
  currentRoute: string = '/';
  isMenuCollapsed: boolean = true;


  constructor(private authService: AuthService, private router: Router) { }

  toggle() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  close() {
    this.isMenuCollapsed = true;
  }

  logout() {
    this.close();
    this.authService.logout();
  }

  ngOnInit(): void {
    this.routerEventSubscription = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationStart) {
        this.currentRoute = ev.url;
      }
    });
    this.user$ = this.authService.user;
  }

  ngOnDestroy(): void {
    this.routerEventSubscription.unsubscribe();
  }
  
}
  




