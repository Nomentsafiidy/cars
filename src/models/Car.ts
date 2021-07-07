import { ModelBase } from './ModelBase';

export class Car extends ModelBase {
    public id: number;
    public registration: string;
    public name: string;
    public comments?: Comment[];
    public user_id: number;
    constructor(obj?: object) {
        super(obj);
        this.id = this.id || -1;
        this.registration = this.registration || '';
        this.name = this.name || '';
    }
}
