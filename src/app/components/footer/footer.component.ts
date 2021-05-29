import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  url: any;
  ocultarFooter: any;

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
        this.ocultarFooter = false;
        console.log(this.ocultarFooter);
      }

      else {
        this.ocultarFooter = true;
      }

    });
  }

}
