import { ModelBase } from './ModelBase';

export class User extends ModelBase {
    public id: number;
    public email: string;
    public name: string;
    public password?: string;
    constructor(obj?: object) {
        super(obj);
        this.id = this.id || -1;
        this.email = this.email || '';
        this.password = this.password || '';
        this.name = this.name || '';
    }
}
