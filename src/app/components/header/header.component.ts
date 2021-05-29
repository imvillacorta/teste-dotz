import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  url: any;
  ocultarHeader: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.url = this.activatedRoute?.root?.snapshot?.firstChild?.routeConfig?.path;

      if (this.url === 'login' || this.url === '' || this.url === 'auto-cadastro') {
        this.ocultarHeader = false;
        console.log(this.ocultarHeader);
      }

      else {
        this.ocultarHeader = true;
      }

    });
  }

}
