import React from 'react';

import ReactInputMask from 'react-input-mask';
import { Controller, useForm } from 'react-hook-form';

import { Button, InputLabel } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Group } from "/imports/api/groups";

export type GroupFields = Omit<Group, '_id'>;
interface UserFormProps {
    title: string;
    onSubmit: (values: GroupFields) => void;
    onCancel: () => void;
    group?: Group;
    submitText?: string;
}

export const GroupForm: React.FC<UserFormProps> = ({
                                                           title,
                                                           group,
                                                           onSubmit,
                                                           submitText = 'Добавить группу',
                                                           onCancel,
                                                       }) => {
    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<GroupFields>({
        defaultValues: group,
    });

    console.log('group inside', group);

    return (
        <form onSubmit={handleSubmit(onSubmit)} title={title}>
            <Stack spacing={2} width={'100%'}>
                <TextField {...register('groupName', {required: true})} label="Название группы" />
                <div style={{color: "red"}}>
                    {errors?.groupName && <p>{errors?.groupName?.message || "Обязательное поле"}</p>}
                </div>

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
