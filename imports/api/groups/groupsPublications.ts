import { Meteor } from 'meteor/meteor';

import { GroupsCollection } from './GroupsCollection';

Meteor.publish('groups', function publishGroups() {
    return GroupsCollection.find({});
});