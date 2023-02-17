import React from 'react';

import ReactInputMask from 'react-input-mask';
import { Controller, useForm } from 'react-hook-form';

import {Button, InputLabel, TextareaAutosize} from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {Schedule} from "/imports/api/schedules";
import {Professor} from "/imports/api/professors";
import {useMeteorCall} from "/imports/ui/shared/hooks/useMeteorCall";
import "/imports/ui/pages/TextareaAutosizeMessageStyle.css";
import { Select } from '/imports/ui/shared/ui/Select';

export type ScheduleFields = Omit<Schedule, '_id'>;
interface UserFormProps {
    title: string;
    onSubmit: (values: ScheduleFields) => void;
    onCancel: () => void;
    schedule?: Schedule;
    submitText?: string;
}

export const ScheduleForm: React.FC<UserFormProps> = ({
                                                           title,
                                                           schedule,
                                                           onSubmit,
                                                           submitText = 'Добавить расписание',
                                                           onCancel,
                                                       }) => {
    const {
        register,
        formState: {errors},
        handleSubmit,
        control,
        watch
    } = useForm<ScheduleFields>({
        defaultValues: schedule,
        mode: "onSubmit"
    });

    console.log('Schedule inside', schedule);

    const { data: professors } = useMeteorCall<Professor[]>('professors.get');
    const mappedListP = professors?.map(({ lastname, firstname, middlename, _id }) => ({
        label: `${lastname} ${firstname} ${middlename}`,
        value: _id,
    }));

    let listType = [{label: '', value: ''}];
    listType[0] = {label: 'Лекция', value: 'Лекция'};
    listType[1] = {label: 'Практика', value: 'Практика'};

    return (
        <form onSubmit={handleSubmit(onSubmit)} title={title}>
            <Stack spacing={2} width={'100%'}>
                <InputLabel>Номер недели</InputLabel>
                <TextareaAutosize {...register('numberOfWeek', {required: true})} minRows={1} readOnly={true} placeholder={schedule?.numberOfWeek} className="TextareaAutosizeStyleMessage"></TextareaAutosize>

                <InputLabel>День недели</InputLabel>
                <TextareaAutosize {...register('day', {required: true})} minRows={1} readOnly={true} placeholder={schedule?.day} className="TextareaAutosizeStyleMessage"></TextareaAutosize>

                <InputLabel>Начало занятия</InputLabel>
                <TextareaAutosize {...register('timeBegin', {required: true})} minRows={1} readOnly={true} placeholder={schedule?.timeBegin} className="TextareaAutosizeStyleMessage"></TextareaAutosize>

                <InputLabel>Конец занятия</InputLabel>
                <TextareaAutosize {...register('timeEnd', {required: true})} minRows={1} readOnly={true} placeholder={schedule?.timeEnd} className="TextareaAutosizeStyleMessage"></TextareaAutosize>

                <TextField {...register('subject', {required: true})} label="Предмет" />
                <div style={{color: "red"}}>
                    {errors?.subject && <p>{errors?.subject?.message || "Обязательное поле"}</p>}
                </div>

                <TextField {...register('auditory', {required: true})} label="Аудитория" />
                <div style={{color: "red"}}>
                    {errors?.subject && <p>{errors?.subject?.message || "Обязательное поле"}</p>}
                </div>

                <InputLabel>Тип занятия</InputLabel>
                <Controller
                    render={({ field }) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        return <Select {...field} options={listType} />;
                    }}
                    name={'type'}
                    control={control}
                    rules={{
                        required: {value: true, message: 'Обязательное поле'},
                    }}
                />

                <InputLabel>Профессор</InputLabel>
                <Controller
                    render={({ field }) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        return <Select {...field} options={mappedListP} />;
                    }}
                    name={'professor_id'}
                    control={control}
                    rules={{
                        required: {value: true, message: 'Обязательное поле'},
                    }}
                />

                <Stack direction={'row'} justifyContent={'end'} spacing={2} width={'100%'}>
                    <Button type={'reset'} variant={'contained'} color={'primary'} onClick={onCancel}>
                        Отмена
                    </Button>
                    <Button type={'submit'} variant={'contained'} color={'secondary'}>
                        {submitText}
                    </Button>
                </Stack>
            </Stack>
        </form>
    );
};
