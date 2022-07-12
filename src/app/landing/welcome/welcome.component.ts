import { Component, OnInit } from '@angular/core';
  // core version + navigation, pagination modules:
  import Swiper, { Navigation, Pagination } from 'swiper';
  // import Swiper and modules styles
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';

//   // init Swiper:
//   const swiper = new Swiper('.swiper', {
//   // Optional parameters
//   direction: 'vertical',
//   loop: true,

//   // If we need pagination
//   pagination: {
//     el: '.swiper-pagination',
//   },

//   // Navigation arrows
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },

//   // And if we need scrollbar
//   scrollbar: {
//     el: '.swiper-scrollbar',
//   },
// });



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  slides: string [] = ['../../../assets/images/new-illustration.svg', '../../../assets/images/thrid-illustration.svg', '../../../assets/images/illustration-1.svg' ]
    i=0;

  WelcomeTexts: string [] = ['Create free notes and Collaborate with your team', "Capture, store, and manage notes on different devices", "Record information from different sources and platforms"] 
  j = 0;

  randomText(){
    console.log(this.WelcomeTexts[this.j])
    return this.WelcomeTexts[this.j]
  }

    getSlide() {
      console.log(this.slides[this.i])
        return this.slides[this.i];
    }

    getPrev() {
        this.i = this.i===0 ? 0 : this.i - 1;
        this.j = this.j === 0 ? 0 :this.j - 1;
    }
//edit here    
    getNext() {
        this.i = this.i === this.slides.length ? this.i : this.i + 1;
        this.j = this.j === this.WelcomeTexts.length ? this.j : this.j + 1;
    }




     

}
