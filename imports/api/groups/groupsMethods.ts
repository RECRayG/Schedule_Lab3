import { Meteor } from 'meteor/meteor';

import { Group, GroupsCollection } from './GroupsCollection';
import { useTracker } from 'meteor/react-meteor-data';
import {SchedulesCollection} from "/imports/api/schedules";

Meteor.methods({
    'groups.get'() {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        const query = GroupsCollection.find();

        return query.fetch();
    },
    'groups.getById'({ id }: { id: string }) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        return GroupsCollection.findOne({ _id: id });
    },
    'groups.getByGroupName'({ groupNameCall }: { groupNameCall: string }) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        return GroupsCollection.findOne({ groupName: groupNameCall });
    },

    'groups.insert'({ group }: { group: Group }) {
        return GroupsCollection.insert(group);
    },

    'groups.remove'({ groupId }: { groupId: string }) {
        GroupsCollection.remove(groupId);
        SchedulesCollection.remove({group_id: groupId});
    },

    'groups.update'({ request }: { request: Group & { prevGroupName: string } }) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const { prevGroupName, ...group } = request;
        console.log(prevGroupName);
        console.log('request', request);
        GroupsCollection.update(
            { _id: group._id, groupName: prevGroupName },
            {
                $set: {
                    ...group,
                },
            },
            {
                multi: false,
            }
        );
    },
});
