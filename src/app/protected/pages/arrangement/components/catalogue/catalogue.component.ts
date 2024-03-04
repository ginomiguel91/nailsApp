import { Component, OnInit } from '@angular/core';
import { ArrangementService } from '../../services/arrangement.service';
import { Arrangement } from '../../interfaces/arrangement.interface';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
})
export class CatalogueComponent implements OnInit {
  catalogue: Arrangement[] = [];

  constructor(private arrangementService: ArrangementService) {}
  ngOnInit(): void {
    this.arrangementService.getArrangements().subscribe({
      next: (resp) => {
        this.catalogue = resp;

        console.log('arrangements:', resp);
      },

      error: (err) => {
        console.error(`Error getting arrangements: ${err}`);
      },
    });
  }
}
