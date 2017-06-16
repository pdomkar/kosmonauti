export class Cosmonaut {
    constructor(
    public id: number,
    public name: string,
    public surname: string,
    public born:  {date: { year: number, month: number, day: number }},
    public power: string
){}
}
