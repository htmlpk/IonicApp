import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { AccordionComponent } from '../accordion/accordion.component';
var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild([
                    {
                        path: '',
                        component: HomePage
                    }
                ])
            ], declarations: [HomePage, AccordionComponent],
            exports: []
        })
    ], HomePageModule);
    return HomePageModule;
}());
export { HomePageModule };
//# sourceMappingURL=home.module.js.map