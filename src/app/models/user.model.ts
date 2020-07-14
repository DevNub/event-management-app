// User Class
/** https://nehalist.io/working-with-models-in-angular/ */
import { Event } from './event.model';
import { Deserializable } from "./deserializable.model";

export class User implements Deserializable {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    event: Event[]; //- when I figure this out.
    admin: boolean;

    deserialize(input: any) {
        Object.assign(this, input);
        const lst = []
        input.event.array.forEach(element => {
            lst.push(new Event().deserialize(element));
        });
        this.event = lst;
        return this;
    }
}