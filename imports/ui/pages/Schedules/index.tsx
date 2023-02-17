import React, {useEffect, useState} from 'react';

import { generatePath, useNavigate } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';

import { Loader } from '/imports/ui/shared/ui/Loader';
import { useMeteorCall } from '/imports/ui/shared/hooks/useMeteorCall';
import { ItemsList } from '/imports/ui/widgets/ItemsList';
import { ScheduleFields } from '/imports/ui/components/SchedulesModal/SchedulesForm';

import {ScheduleModal } from '../../components/SchedulesModal';

import { routes } from './routes';

import { Schedule } from '/imports/api/schedules';
import {Group} from "/imports/api/groups";
import {Professor} from "/imports/api/professors";

interface UserFormProps {
    group: string;
    numberOfWeek: string;
    oldGroup?: string;
}

export const SchedulesList: React.FC<UserFormProps> = ({
                                                           group,
                                                           numberOfWeek,
                                                           oldGroup
                                                       }) => {
    const {data: schedules, isLoading, request} = useMeteorCall<Schedule[]>('schedules.getByGroupIdAndNumberOfWeek', { group, numberOfWeek });
    const [createVisible, setCreateVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [currentSchedule, setCurrentSchedule] = useState<Schedule>();
    const navigate = useNavigate();
    // const {data: groupTemp} = useMeteorCall<Group>('groups.getById', { id: group });

    useEffect(() => {
        if (oldGroup != group) {
            request();
        }
    }, [request]);

    console.log("Old Group - ", oldGroup);
    console.log("Group - ", group);
    console.log("Week - ", numberOfWeek);
    console.log("Schedules - ", schedules);

    if (isLoading) {
        return <Loader />;
    }

    const mappedList = schedules?.map(({ subject, auditory, type, professor_id, professor_description, group_id,
                                           numberOfWeek, day, timeBegin, timeEnd, _id }) => ({
        info: `${group_id} ${numberOfWeek} ${day} ${timeBegin} ${timeEnd} ${subject} ${auditory} ${type}`,
        id: _id,
        professor: professor_description
    })).filter(sch => {
        return sch.info.split(" ")[1] == numberOfWeek && sch.info.split(" ")[0] == group
    });

    const toggleEditVisible = () => {
        setEditVisible((prev) => !prev);
    };

    const onSubmitEdit = async (values: ScheduleFields) => {
        if(values.subject.trim() == "")
            values.subject = "-";
        values.subject = values.subject.replaceAll(" ", "-");
        values.subject = values.subject.split(" ").reduce((acc, value) => acc + value);

        if(values.auditory.trim() == "")
            values.auditory = "-";
        values.auditory = values.auditory.replaceAll(" ", "-");
        values.auditory = values.auditory.split(" ").reduce((acc, value) => acc + value);

        const {data: prof} = await Meteor.callAsync('professors.getById', { id: values.professor_id.value })
        if(prof) {
            values.professor_description = prof?.lastname + prof?.firstname.substring(0,1) + "." + prof?.middlename.substring(0,1) + ".";
        } else {
            values.professor_description = "";
        }

        values.professor_description = values.professor_id?.label?.split(" ")[0] + " " + values.professor_id?.label?.split(" ")[1]?.substring(0,1) + "." + values.professor_id?.label?.split(" ")[2]?.substring(0,1) + ".";

        if(values.type.value == 'Лекция') {
            values.type = 'Лекция';
        } else {
            values.type = 'Практика';
        }

        await Meteor.callAsync('schedules.update', {
            request: { ...values, day: values.day, timeBegin: values.timeBegin, timeEnd: values.timeEnd, prevGroup_Id: group },
        });
        toggleEditVisible();
        await request();
    };

    const onEdit = async (id: string) => {
        const schedule = await Meteor.callAsync('schedules.getById', { id });
        console.log('schedule', schedule);
        setCurrentSchedule(schedule);
        toggleEditVisible();
    };

    const onDelete = async (id: string) => {
        Meteor.call('schedules.remove', { scheduleId: id });
        await request();
    };

    return (
        <>
            <ItemsList
                dataSchedule={mappedList ?? []}
                title={'Расписание'}
                onDeleteItem={onDelete}
                onEditItem={onEdit}
            />
            <ScheduleModal
                visible={editVisible}
                onClose={toggleEditVisible}
                onSubmit={onSubmitEdit}
                schedule={currentSchedule}
                submitText={'Сохранить'}
            />
        </>
    );
};
