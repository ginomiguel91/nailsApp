import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ArrangementService } from '../../services/arrangement.service';
import { Arrangement } from '../../interfaces/arrangement.interface';
declare var tns: any;

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
})
export class CatalogueComponent implements OnInit {
  catalogue: Arrangement[] = [];
  initialized: boolean = false;
  isMobile = false;

  constructor(private arrangementService: ArrangementService) {}
  ngOnInit(): void {
    this.checkIfMobile();
    window.addEventListener('resize', this.checkIfMobile.bind(this));
    this.arrangementService.getArrangements().subscribe({
      next: (resp) => {
        this.catalogue = resp;

        console.log('arrangements:', resp);
        setTimeout(() => {
          if (this.catalogue.length > 0 && !this.initialized) {
            console.log(
              'Initializing carousel with arrangements:',
              this.catalogue
            );
            this.initializeCarousel();
          }
        }, 0);
      },

      error: (err) => {
        console.error(`Error getting arrangements: ${err}`);
      },
    });
  }

  initializeCarousel(): void {
    tns({
      container: '.my-slider',
      items: 1,
      slideBy: 1,
      autoplay: false,
      controls: true,
      nav: false,
      gutter: 20,
      mouseDrag: true,
      touch: true,
      responsive: {
        640: { items: 1 },
        768: { items: 2 },
        1024: { items: 3 },
      },
    });

    this.initialized = true;
    const [prev, next] = Array.from(
      document.querySelectorAll('.tns-controls button')
    );
    if (prev && next) {
      prev.innerHTML = '❮';
      next.innerHTML = '❯';

      prev.classList.add('button', 'is-link', 'is-rounded', 'mx-2');
      next.classList.add('button', 'is-link', 'is-rounded', 'mx-2');
    }
  }
  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }
}
