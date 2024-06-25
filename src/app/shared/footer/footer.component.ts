import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
 // Añadir Event Listener al botón de "Back to Top"
 ngOnInit(): void {
  const scrollToTopButton = document.getElementById('scrollToTopButton');
  if (scrollToTopButton) {
    scrollToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}


 // Mostrar/Ocultar el botón basado en la posición de scroll
 @HostListener('window:scroll', [])
 onWindowScroll() {
   const scrollToTopButton = document.getElementById('scrollToTopButton');
   if (scrollToTopButton) {
     if (window.scrollY > 300) {
       scrollToTopButton.classList.add('show');
     } else {
       scrollToTopButton.classList.remove('show');
     }
   }
 }



}
