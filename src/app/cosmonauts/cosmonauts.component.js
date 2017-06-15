"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var cosmonaut_service_1 = require("./../services/cosmonaut.service");
var CosmonautsComponent = (function () {
    function CosmonautsComponent(cosmonautService) {
        this.cosmonautService = cosmonautService;
    }
    CosmonautsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cosmonautService.getCosmonauts()
            .then(function (data) { return _this.cosmonauts = data; });
    };
    CosmonautsComponent.prototype.deleteCosmonaut = function (cosmonaut) {
        var _this = this;
        this.cosmonautService.deleteCosmonaut(cosmonaut.id)
            .then(function () { return _this.cosmonauts = _this.cosmonauts.filter(function (cn) { return cn !== cosmonaut; }); });
    };
    return CosmonautsComponent;
}());
CosmonautsComponent = __decorate([
    core_1.Component({
        selector: 'pd-cosmonauts',
        templateUrl: './cosmonauts.component.html'
    }),
    __metadata("design:paramtypes", [cosmonaut_service_1.CosmonautService])
], CosmonautsComponent);
exports.CosmonautsComponent = CosmonautsComponent;
//# sourceMappingURL=cosmonauts.component.js.map