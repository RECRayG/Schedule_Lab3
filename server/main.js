import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import { RolesEnum } from '/imports/api/user/';
import '/imports/api/schedules/';
import '/imports/api/professors/';
import '/imports/api/groups/';
import {useMeteorCall} from "../imports/ui/shared/hooks/useMeteorCall";
import {Professor} from "../imports/api/professors";

const SEED_USERNAME = 'admin';
const SEED_PASSWORD = 'admin';

Meteor.startup(async () => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    const user = Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
    Meteor.users.update(user, {
      $set: {
        role: RolesEnum.ADMIN,
      },
    });
  }

  console.log( Meteor.server.publish_handlers );
});