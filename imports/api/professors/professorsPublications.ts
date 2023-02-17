import { Meteor } from 'meteor/meteor';

import { ProfessorsCollection } from './ProfessorsCollection';

Meteor.publish('professors', function publishProfessors() {
    return ProfessorsCollection.find({});
});