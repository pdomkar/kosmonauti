"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var cosmonauts = [
            { id: 1, name: 'Vladimír', surname: 'Remek', born: { date: { year: 1948, month: 10, day: 25 } }, power: 'superview' },
            { id: 2, name: 'Vašek', surname: 'Rašek', born: { date: { year: 1949, month: 1, day: 9 } }, power: 'clever' }
        ];
        return { cosmonauts: cosmonauts };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map