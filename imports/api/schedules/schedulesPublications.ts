import { Meteor } from 'meteor/meteor';

import { SchedulesCollection } from './SchedulesCollection';

Meteor.publish('timetable', function publishSchedules() {
    return SchedulesCollection.find({});
});