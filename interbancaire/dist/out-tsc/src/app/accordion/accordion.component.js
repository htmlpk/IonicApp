import * as tslib_1 from "tslib";
import { Component, ViewChild, Renderer, Input } from '@angular/core';
var AccordionComponent = /** @class */ (function () {
    function AccordionComponent(renderer) {
        this.renderer = renderer;
        this.accordionExapanded = false;
        this.icon = "arrow-forward";
    }
    AccordionComponent.prototype.ngOnInit = function () {
        debugger;
        if (this.setExpanded == 0) {
            this.accordionExapanded = true;
        }
        this.toggleAccordion();
    };
    AccordionComponent.prototype.toggleAccordion = function () {
        if (!this.accordionExapanded) {
            this.renderer.setElementStyle(this.cardContent.el, "max-height", "0px");
            this.renderer.setElementStyle(this.cardContent.el, "padding", "0px");
        }
        else {
            this.renderer.setElementStyle(this.cardContent.el, "max-height", "500px");
            this.renderer.setElementStyle(this.cardContent.el, "padding", "0");
        }
        this.accordionExapanded = !this.accordionExapanded;
    };
    tslib_1.__decorate([
        ViewChild("cc"),
        tslib_1.__metadata("design:type", Object)
    ], AccordionComponent.prototype, "cardContent", void 0);
    tslib_1.__decorate([
        Input('title'),
        tslib_1.__metadata("design:type", String)
    ], AccordionComponent.prototype, "title", void 0);
    tslib_1.__decorate([
        Input('setExpanded'),
        tslib_1.__metadata("design:type", Object)
    ], AccordionComponent.prototype, "setExpanded", void 0);
    AccordionComponent = tslib_1.__decorate([
        Component({
            selector: 'app-accordion',
            templateUrl: 'accordion.component.html',
            styleUrls: ['accordion.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Renderer])
    ], AccordionComponent);
    return AccordionComponent;
}());
export { AccordionComponent };
//# sourceMappingURL=accordion.component.js.map