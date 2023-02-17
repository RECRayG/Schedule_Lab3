import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { RolesEnum } from '/imports/api/user/index';
import {Navigate, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {Navbar} from "/imports/ui/widgets/Navbar";

Meteor.methods({
    'user.get'() {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        return Meteor.users.find({}).fetch();
    },

    'user.getById'({ id }: { id: string }) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        return Meteor.users.findOne({ _id: id });
    },

    'user.insert'({ username, password, role }: { username: string; password: string; role: RolesEnum }) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        const user = Accounts.createUser({
            username,
            password,
        });

        Meteor.users.update(user, {
            $set: {
                username,
                role: role,
            },
        });

        return user;
    },

    'user.remove'({ userId }: { userId: string }) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        if (this.userId == userId) {
            throw new Meteor.Error('Попытка удалить себя');
        }

        Meteor.users.remove({ _id: userId });
    },

    'user.getUserRole'() {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return Meteor.users.findOne({ _id: this.userId })?.role;
    },
    'user.getCurrentUser'() {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return Meteor.users.findOne({ _id: this.userId });
    },

    'user.update'({ userId, username, role }: { userId: string; username: string; role: RolesEnum }) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }

        Meteor.users.update(userId, {
            $set: {
                username,
                role: role,
            },
            $unset: {
                doctorId: 1
            }
        });
    }
});