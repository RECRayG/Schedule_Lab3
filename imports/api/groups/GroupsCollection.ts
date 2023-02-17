import { Mongo } from 'meteor/mongo';

export interface Group {
    _id: string;
    groupName: string;
}

export const GroupsCollection = new Mongo.Collection<Group>('groups');

GroupsCollection.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});