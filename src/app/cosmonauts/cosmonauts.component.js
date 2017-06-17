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
        this.totalItems = 0;
        this.itemPerPage = 10;
        this.currentPage = 1;
    }
    CosmonautsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cosmonautService.getCosmonauts()
            .then(function (data) { return _this.totalItems = data.length; });
        this.loadCosmonauts();
    };
    /**
     * Load apropriate cosmonauts by setted page
     */
    CosmonautsComponent.prototype.loadCosmonauts = function () {
        var _this = this;
        this.cosmonautService.getCosmonautsOrderLimit((this.currentPage - 1) * this.itemPerPage, this.itemPerPage)
            .then(function (data) {
            _this.cosmonauts = data;
        });
    };
    /**
     * Delete pass cosmonaut using cosmonautService after confirm
     * @param cosmonaut
     */
    CosmonautsComponent.prototype.deleteCosmonaut = function (cosmonaut) {
        var _this = this;
        if (confirm("Opravdu chcete smazat kosmonauta " + cosmonaut.name + ' ' + cosmonaut.surname + '?')) {
            this.cosmonautService.deleteCosmonaut(cosmonaut.id)
                .then(function () {
                _this.loadCosmonauts();
                _this.totalItems--;
            });
        }
    };
    /**
     * Change view page and load Appropriate cosmonauts
     * Is called as Output of paginator class
     * @param page
     */
    CosmonautsComponent.prototype.setPage = function (page) {
        this.currentPage = page;
        this.loadCosmonauts();
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