import { Meteor } from 'meteor/meteor';

import { Professor, ProfessorsCollection } from './ProfessorsCollection';
import { useTracker } from 'meteor/react-meteor-data';

Meteor.methods({
    'professors.get'() {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        const query = ProfessorsCollection.find();

        return query.fetch();
    },
    'professors.getById'({ id }: { id: string }) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        return ProfessorsCollection.findOne({ _id: id });
    },
    'professors.getByFullName'({ lastnameCall, firstnameCall, middlenameCall }: { lastnameCall: string, firstnameCall: string, middlenameCall: string }) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        return ProfessorsCollection.findOne({ lastname: lastnameCall, firstname: firstnameCall, middlename: middlenameCall });
    },

    'professors.insert'({ professor }: { professor: Professor }) {
        ProfessorsCollection.insert(professor);
    },

    'professors.remove'({ professorId }: { professorId: string }) {
        ProfessorsCollection.remove(professorId);
    },

    'professors.update'({ request }: { request: Professor & { prevLastname: string } }) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const { prevLastname, ...professor } = request;
        console.log(prevLastname);
        console.log('request', request);
        ProfessorsCollection.update(
            { _id: professor._id, lastname: prevLastname },
            {
                $set: {
                    ...professor,
                },
            },
            {
                multi: false,
            }
        );
    },
});
