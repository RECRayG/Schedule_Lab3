import React, { useState } from 'react';

import { generatePath, useNavigate } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';

import { Loader } from '/imports/ui/shared/ui/Loader';
import { useMeteorCall } from '/imports/ui/shared/hooks/useMeteorCall';
import { ItemsList } from '/imports/ui/widgets/ItemsList';
import { GroupFields } from '/imports/ui/components/GroupsModal/GroupsForm';

import {GroupModal } from '../../components/GroupsModal';

import { routes } from './routes';

import { Group } from '/imports/api/groups';
import {ScheduleFields} from "/imports/ui/components/SchedulesModal/SchedulesForm";
import {Schedule} from "@mui/icons-material";

export const GroupsList = () => {
    const { data: groups, isLoading, request } = useMeteorCall<Group[]>('groups.get');
    const [createVisible, setCreateVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [currentGroup, setCurrentGroup] = useState<Group>();
    const navigate = useNavigate();

    if (isLoading) {
        return <Loader />;
    }

    const mappedList = groups?.map(({ groupName, _id }) => ({
        info: groupName,
        id: _id,
    }));
    const toggleCreateVisible = () => {
        setCreateVisible((prev) => !prev);
    };

    const toggleEditVisible = () => {
        setEditVisible((prev) => !prev);
    };
    const onSubmitCreate = async (values: GroupFields) => {
        values.groupName = values.groupName.trim();
        if(values.groupName == "")
            values.groupName = "-";

        values.groupName = values.groupName.replace(" ", "-");

        values.groupName = values.groupName.split(" ").reduce((acc, value) => acc + value);

        let group_id = await Meteor.callAsync('groups.insert', { group: values });

        const transformPayload = { subject: "",
                                    auditory: "",
                                    type: "",
                                    professor_id: "",
                                    group_id: group_id };
        for(let i = 0; i < 18; i++) {
            for(let j = 0; j < 6; j++) {
                switch(j) {
                    case 0:
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????????????',
                            timeBegin: '08:30',
                            timeEnd: '10:00'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????????????',
                            timeBegin: '10:15',
                            timeEnd: '11:45'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????????????',
                            timeBegin: '12:00',
                            timeEnd: '13:30'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????????????',
                            timeBegin: '14:00',
                            timeEnd: '15:30'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????????????',
                            timeBegin: '15:45',
                            timeEnd: '17:15'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????????????',
                            timeBegin: '17:30',
                            timeEnd: '19:00'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????????????',
                            timeBegin: '19:15',
                            timeEnd: '20:45'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????????????',
                            timeBegin: '21:00',
                            timeEnd: '22:30'
                        });
                        break;
                    case 1:
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '08:30',
                            timeEnd: '10:00'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '10:15',
                            timeEnd: '11:45'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '12:00',
                            timeEnd: '13:30'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '14:00',
                            timeEnd: '15:30'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '15:45',
                            timeEnd: '17:15'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '17:30',
                            timeEnd: '19:00'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '19:15',
                            timeEnd: '20:45'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '21:00',
                            timeEnd: '22:30'
                        });
                        break;
                    case 2:
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????',
                            timeBegin: '08:30',
                            timeEnd: '10:00'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????',
                            timeBegin: '10:15',
                            timeEnd: '11:45'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????',
                            timeBegin: '12:00',
                            timeEnd: '13:30'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????',
                            timeBegin: '14:00',
                            timeEnd: '15:30'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????',
                            timeBegin: '15:45',
                            timeEnd: '17:15'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????',
                            timeBegin: '17:30',
                            timeEnd: '19:00'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????',
                            timeBegin: '19:15',
                            timeEnd: '20:45'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????',
                            timeBegin: '21:00',
                            timeEnd: '22:30'
                        });
                        break;
                    case 3:
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '08:30',
                            timeEnd: '10:00'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '10:15',
                            timeEnd: '11:45'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '12:00',
                            timeEnd: '13:30'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '14:00',
                            timeEnd: '15:30'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '15:45',
                            timeEnd: '17:15'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '17:30',
                            timeEnd: '19:00'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '19:15',
                            timeEnd: '20:45'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '21:00',
                            timeEnd: '22:30'
                        });
                        break;
                    case 4:
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '08:30',
                            timeEnd: '10:00'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '10:15',
                            timeEnd: '11:45'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '12:00',
                            timeEnd: '13:30'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '14:00',
                            timeEnd: '15:30'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '15:45',
                            timeEnd: '17:15'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '17:30',
                            timeEnd: '19:00'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '19:15',
                            timeEnd: '20:45'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '21:00',
                            timeEnd: '22:30'
                        });
                        break;
                    case 5:
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '08:30',
                            timeEnd: '10:00'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '10:15',
                            timeEnd: '11:45'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '12:00',
                            timeEnd: '13:30'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '14:00',
                            timeEnd: '15:30'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '15:45',
                            timeEnd: '17:15'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '17:30',
                            timeEnd: '19:00'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '19:15',
                            timeEnd: '20:45'
                        });
                        await Meteor.callAsync('schedules.insertNull', {
                            ...transformPayload,
                            numberOfWeek: i + 1,
                            day: '??????????????',
                            timeBegin: '21:00',
                            timeEnd: '22:30'
                        });
                        break;
                }
            }
        }

        toggleCreateVisible();
        await request();
    };

    const onSubmitEdit = async (values: GroupFields) => {
        values.groupName = values.groupName.trim();
        if(values.groupName == "")
            values.groupName = "-";

        values.groupName = values.groupName.replace(" ", "-");

        values.groupName = values.groupName.split(" ").reduce((acc, value) => acc + value);


        await Meteor.callAsync('groups.update', {
            request: { ...values, prevGroupName: currentGroup?.groupName },
        });
        toggleEditVisible();
        await request();
    };

    const onEdit = async (id: string) => {
        const group = await Meteor.callAsync('groups.getById', { id });
        console.log('group', group);
        setCurrentGroup(group);
        toggleEditVisible();
    };
    const onDelete = async (id: string) => {
        await Meteor.call('groups.remove', { groupId: id });



        await request();
    };

    return (
        <>
            <ItemsList
                data={mappedList ?? []}
                title={'????????????'}
                onDeleteItem={onDelete}
                onEditItem={onEdit}
                onCreate={toggleCreateVisible}
            />
            <GroupModal visible={createVisible} onClose={toggleCreateVisible} onSubmit={onSubmitCreate}/>
            <GroupModal
                visible={editVisible}
                onClose={toggleEditVisible}
                onSubmit={onSubmitEdit}
                group={currentGroup}
                submitText={'??????????????????'}
            />
        </>
    );
};
