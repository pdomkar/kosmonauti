"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var cosmonauts = [
            { id: 1, name: 'Vladimír', surname: 'Remek', born: new Date(1948, 9, 26), power: 'superview' },
            { id: 2, name: 'Vašek', surname: 'Rašek', born: new Date(1949, 1, 27), power: 'clever' }
        ];
        return { cosmonauts: cosmonauts };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map