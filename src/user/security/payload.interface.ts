export class Payload {
    id: string;
    constructor(_id: string) {
        this.id = _id;
    }
    toPlain(){
        return JSON.parse(JSON.stringify(this));
    }
}