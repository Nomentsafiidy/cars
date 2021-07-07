import { ModelBase } from './ModelBase';

export class Comment extends ModelBase {
    public id: number;
    public car_id: number;
    public content: string;
    public createdAt: number;

    constructor(obj?: object) {
        super(obj);
        this.id = this.id || -1;
        this.car_id = this.car_id || -1;
        this.content = this.content || '';
        this.createdAt = this.createdAt || -1;
    }
}
