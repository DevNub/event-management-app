// Event Class
import { Deserializable } from "./deserializable.model";

export class Event implements Deserializable {
    id: number;
    title: string;
    description: string;
    category: string;
    start_date: Date;
    end_date: Date;
    cost: number;
    venue: string;
    flyer: string;
    visibility: boolean;
    user_id: number;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}