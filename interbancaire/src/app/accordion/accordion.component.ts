import { Component, ViewChild, OnInit, Renderer, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-accordion',
  templateUrl: 'accordion.component.html',
  styleUrls: ['accordion.component.scss']
})
export class AccordionComponent implements OnInit {

  accordionExapanded = false;
  @ViewChild("cc") cardContent: any;
  @Input('title') title: string;
  @Input('setExpanded') setExpanded: any;
  @Input('image') image: any;
  icon: string = "arrow-forward";

  constructor(public renderer: Renderer) {
  }

  ngOnInit() {
      this.accordionExapanded = true;
    this.toggleAccordion();
  }

  toggleAccordion() {
    // if (!this.accordionExapanded) {
    //   this.renderer.setElementStyle(this.cardContent.el, "max-height", "0px");
    //   this.renderer.setElementStyle(this.cardContent.el, "padding", "0px");
    //   this.renderer.setElementStyle(this.cardContent.el, "display", "none");
    // } else {
    //   this.renderer.setElementStyle(this.cardContent.el, "max-height", "500px");
    //   this.renderer.setElementStyle(this.cardContent.el, "padding", "0");
    //   this.renderer.setElementStyle(this.cardContent.el, "display", "unset");
    // }
    // this.accordionExapanded = !this.accordionExapanded;
  }
}