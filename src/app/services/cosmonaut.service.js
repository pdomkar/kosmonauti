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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var CosmonautService = (function () {
    function CosmonautService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.url = 'api/cosmonauts';
    }
    /**
     * Create new entry in memory with Cosmponaut pass as argument and return him
     * @param cosmonaut
     * @returns Promise<Cosmonaut>
     */
    CosmonautService.prototype.createCosmonaut = function (cosmonaut) {
        return this.http.post(this.url, cosmonaut, { headers: this.headers })
            .toPromise()
            .then(function (result) { return result.json().data; })
            .catch(this.handleError);
    };
    /**
     * Update Cosmonaut pass as argument on base his id and return updated Cosmonaut
     * @param cosmonaut updated Cosmonaut
     * @returns Promise<Cosmonaut>
     */
    CosmonautService.prototype.updateCosmonaut = function (cosmonaut) {
        return this.http.put(this.url + '/' + cosmonaut.id, cosmonaut, { headers: this.headers })
            .toPromise()
            .then(function () { return cosmonaut; })
            .catch(this.handleError);
    };
    /**
     * Delete cosmonaut with id from memory
     * @param id of deleted Cosmonaut
     * @returns {any}
     */
    CosmonautService.prototype.deleteCosmonaut = function (id) {
        return this.http.delete(this.url + '/' + id, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    /**
     * Return Array of all cosmonauts from memory In Promise
     * @returns Promise<Cosmonaut[]>
     */
    CosmonautService.prototype.getCosmonauts = function () {
        return this.http.get(this.url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    /**
     * Return Array of limit cosmonauts from offset in Promise
     * @param offset
     * @param limit
     * @returns Promise<Cosmonaut[]>
     */
    CosmonautService.prototype.getCosmonautsOrderLimit = function (offset, limit) {
        return this.http.get(this.url)
            .toPromise()
            .then(function (response) {
            return response.json().data.slice(offset, offset + limit);
        })
            .catch(this.handleError);
    };
    /**
     * Return Cosmonaut depending on parametr id
     * @param id of search Cosmonaut
     * @returns Promise<Cosmonaut>
     */
    CosmonautService.prototype.getCosmonaut = function (id) {
        return this.http.get(this.url + '/' + id)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    CosmonautService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return CosmonautService;
}());
CosmonautService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CosmonautService);
exports.CosmonautService = CosmonautService;
//# sourceMappingURL=cosmonaut.service.js.map