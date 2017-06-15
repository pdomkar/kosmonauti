import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const cosmonauts = [
            {id:1, name: 'Vladimír', surname: 'Remek', born: '1948, 9, 26', power: 'superview'},
            {id:2, name: 'Vašek', surname: 'Rašek', born: '1949, 1, 27', power: 'clever'}
        ];
        return {cosmonauts};
    }
}
