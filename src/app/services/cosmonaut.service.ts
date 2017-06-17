import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Cosmonaut } from './../cosmonaut';

@Injectable()
export class CosmonautService {
    private headers: Headers = new Headers({'Content-Type': 'application/json'});
    private url: string = 'api/cosmonauts';

    constructor(private http: Http) { }


    /**
     * Create new entry in memory with Cosmponaut pass as argument and return him
     * @param cosmonaut
     * @returns Promise<Cosmonaut>
     */
    createCosmonaut(cosmonaut: Cosmonaut): Promise<Cosmonaut> {
        return this.http.post(this.url, cosmonaut, {headers: this.headers})
            .toPromise()
            .then(result => result.json().data as Cosmonaut)
            .catch(this.handleError);
    }

    /**
     * Update Cosmonaut pass as argument on base his id and return updated Cosmonaut
     * @param cosmonaut updated Cosmonaut
     * @returns Promise<Cosmonaut>
     */
    updateCosmonaut(cosmonaut: Cosmonaut): Promise<Cosmonaut> {
        return this.http.put(this.url+'/'+cosmonaut.id, cosmonaut, {headers: this.headers})
            .toPromise()
            .then(() => cosmonaut)
            .catch(this.handleError);
    }

    /**
     * Delete cosmonaut with id from memory
     * @param id of deleted Cosmonaut
     * @returns {any}
     */
    deleteCosmonaut(id: number): Promise<void> {
        return this.http.delete(this.url+'/'+id, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    /**
     * Return Array of all cosmonauts from memory In Promise
     * @returns Promise<Cosmonaut[]>
     */
    getCosmonauts(): Promise<Cosmonaut[]> {
        return this.http.get(this.url)
            .toPromise()
            .then(response => response.json().data as Cosmonaut[])
            .catch(this.handleError);
    }

    /**
     * Return Array of limit cosmonauts from offset in Promise
     * @param offset
     * @param limit
     * @returns Promise<Cosmonaut[]>
     */
    getCosmonautsLimit(offset: number, limit: number): Promise<Cosmonaut[]> {
        return this.http.get(this.url)
            .toPromise()
            .then(response => {
                return (response.json().data.slice(offset, offset+limit) as Cosmonaut[]);
            })
            .catch(this.handleError);
    }

    /**
     * Return Cosmonaut depending on parametr id
     * @param id of search Cosmonaut
     * @returns Promise<Cosmonaut>
     */
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
