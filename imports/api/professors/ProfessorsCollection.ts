import { Mongo } from 'meteor/mongo';

export interface Professor {
    _id: string;
    lastname: string;
    firstname: string;
    middlename: string;
}

export const ProfessorsCollection = new Mongo.Collection<Professor>('professors');

ProfessorsCollection.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});