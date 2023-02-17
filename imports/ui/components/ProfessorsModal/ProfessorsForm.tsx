import React from 'react';

import ReactInputMask from 'react-input-mask';
import { Controller, useForm } from 'react-hook-form';

import { Button, InputLabel } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Professor } from "/imports/api/professors";

export type ProfessorFields = Omit<Professor, '_id'>;
interface UserFormProps {
    title: string;
    onSubmit: (values: ProfessorFields) => void;
    onCancel: () => void;
    professor?: Professor;
    submitText?: string;
}

export const ProfessorForm: React.FC<UserFormProps> = ({
                                                         title,
                                                         professor,
                                                         onSubmit,
                                                         submitText = 'Добавить профессора',
                                                         onCancel,
                                                     }) => {
    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<ProfessorFields>({
        defaultValues: professor,
    });

    console.log('professor inside', professor);

    return (
        <form onSubmit={handleSubmit(onSubmit)} title={title}>
            <Stack spacing={2} width={'100%'}>
                <TextField {...register('lastname', {required: true})} label="Фамилия" />
                <div style={{color: "red"}}>
                    {errors?.lastname && <p>{errors?.lastname?.message || "Обязательное поле"}</p>}
                </div>
                <TextField {...register('firstname', {required: true})} label="Имя" />
                <div style={{color: "red"}}>
                    {errors?.firstname && <p>{errors?.firstname?.message || "Обязательное поле"}</p>}
                </div>
                <TextField {...register('middlename', {required: {value: true, message: 'Если отчество отсутствует, укажите -'}})} label="Отчество" />
                <div style={{color: "red"}}>
                    {errors?.middlename && <p>{errors?.middlename?.message || "Обязательное поле"}</p>}
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
