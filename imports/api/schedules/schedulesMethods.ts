import { Meteor } from 'meteor/meteor';

import { Schedule, SchedulesCollection } from './SchedulesCollection';
import {Group} from "/imports/api/groups";

Meteor.methods({
    'schedules.get'() {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        const query = SchedulesCollection.find();

        return query.fetch();
    },
    'schedules.getById'({ id }: { id: string }) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        return SchedulesCollection.findOne({ _id: id });
    },
    'schedules.getByProfessorId'({ id }: { id: string }) {
        const query = SchedulesCollection.find({ professor_id: id });
        return query.fetch();
    },
    'schedules.getOneByProfessorId'({ id }: { id: string }) {
        return SchedulesCollection.findOne({ professor_id: id });
    },
    'schedules.getByGroupId'({ id }: { id: string }) {
        const query = SchedulesCollection.find({ group_id: id });
        return query.fetch();
    },
    'schedules.getOneByGroupId'({ id }: { id: string }) {
        return SchedulesCollection.findOne({ group_id: id });
    },
    'schedules.getByGroupIdAndNumberOfWeek'({ group, number_of_week }: { group: string, number_of_week: string }) {
        const query = SchedulesCollection.find({ group_id: group, numberOfWeek: number_of_week });
        return query.fetch();
    },

    'schedules.insert'({ schedule }: { schedule: Schedule }) {
        SchedulesCollection.insert(schedule);
    },

    'schedules.insertNull'({ subject, auditory, type, professor_id, group_id,
                               numberOfWeek, day, timeBegin, timeEnd } :
                           { subject: string, auditory: string, type: string, professor_id: string, group_id: string,
                               numberOfWeek: string, day: string, timeBegin: string, timeEnd: string }) {
        SchedulesCollection.insert({
            subject: subject,
            auditory: auditory,
            type: type,
            professor_id: professor_id,
            numberOfWeek: numberOfWeek,
            day: day,
            timeBegin: timeBegin,
            timeEnd: timeEnd,
            group_id: group_id,
            professor_description: ""
        });
    },

    'schedules.remove'({ scheduleId }: { scheduleId: string }) {
        // SchedulesCollection.remove(scheduleId);
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        SchedulesCollection.update(
            { _id: scheduleId },
            {
                $set: {
                    subject: "",
                    auditory: "",
                    type: "",
                    professor_id: "",
                    professor_description: ""
                },
            },
            {
                multi: false,
            }
        );
    },

    'schedules.removeByProfessorId'({ id }: { id: string }) {
        SchedulesCollection.remove({professor_id: id});
    },
    'schedules.removeByGroupId'({ id }: { id: string }) {
        SchedulesCollection.remove({group_id: id});
    },

    'schedules.update'({ request }: { request: Schedule & { prevDay: string, prevTimeBegin: string, prevTimeEnd: string, prevGroup_Id: string } }) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const { prevDay, prevGroup_Id, prevTimeBegin, prevTimeEnd, ...schedule } = request;

        console.log('request', request);
        SchedulesCollection.update(
            { _id: schedule._id, timeBegin: prevTimeBegin, timeEnd: prevTimeEnd, day: prevDay, group_id: prevGroup_Id },
            {
                $set: {
                    ...schedule,
                },
            },
            {
                multi: false,
            }
        );
    },
});
