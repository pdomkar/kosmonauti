import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Cosmonaut } from './cosmonaut';

@Injectable()
export class CosmonautService {
    private headers: Headers = new Headers({'Content-Type': 'application/json'});
    private url: string = 'api/cosmonauts';

    constructor(private http: Http) { }


    createCosmonaut(cosmonaut: Cosmonaut): Promise<Cosmonaut> {
        return this.http.post(this.url, cosmonaut, {headers: this.headers})
            .toPromise()
            .then(result => result.json().data as Cosmonaut)
            .catch(this.handleError);
    }

    updateCosmonaut(cosmonaut: Cosmonaut): Promise<Cosmonaut> {
        return this.http.put(this.url+'/'+cosmonaut.id, cosmonaut, {headers: this.headers})
            .toPromise()
            .then(() => cosmonaut)
            .catch(this.handleError);
    }

    deleteCosmonaut(id: number): Promise<void> {
        return this.http.delete(this.url+'/'+id, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    getCosmonauts(): Promise<Cosmonaut[]> {
        return this.http.get(this.url)
            .toPromise()
            .then(response => response.json().data as Cosmonaut[])
            .catch(this.handleError);
    }

    getCosmonaut(id: number): Promise<Cosmonaut> {
        return this.http.get(this.url+'/'+id)
            .toPromise()
            .then(response => response.json().data as Cosmonaut)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
