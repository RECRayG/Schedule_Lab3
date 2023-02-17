import { Mongo } from 'meteor/mongo';

export interface Schedule {
    _id: string;
    subject: string;
    auditory: string;
    type: string;

    day: string;
    timeBegin: string;
    timeEnd: string;
    numberOfWeek: string;

    group_id: string;

    professor_id: string;
    professor_description: string;
}

export const SchedulesCollection = new Mongo.Collection<Schedule>('schedules');

SchedulesCollection.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});