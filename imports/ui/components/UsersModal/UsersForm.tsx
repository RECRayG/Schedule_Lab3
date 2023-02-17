import React from 'react';

import {Controller, useForm} from 'react-hook-form';

import {Button, InputLabel} from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import {RolesEnum, UserType} from '/imports/api/user';

import {Select} from '../../shared/ui/Select';
import {useMeteorCall} from "/imports/ui/shared/hooks/useMeteorCall";

export interface UserFields {
    username: string;
    password?: string;
    role: { value: string; label: string };
}
interface UserFormProps {
    title: string;
    onSubmit: (values: UserFields) => void;
    onCancel: () => void;
    user?: UserType;
    submitText?: string;
}

const roleMap = {
    [RolesEnum.ADMIN]: 'Админ',
    [RolesEnum.USER]: 'Пользователь',
};

export const UserForm: React.FC<UserFormProps> = ({ title, user, onSubmit, submitText = 'Создать', onCancel }) => {
    const {
        register,
        formState: {errors},
        handleSubmit,
        control,
        watch
    } = useForm<UserFields>({
        defaultValues: {
            ...user,
            role: user?.role
                ? {
                    value: user.role,
                    label: roleMap[user?.role],
                }
                : undefined,
        },
        mode: "onSubmit"
    });

    const { data: users } = useMeteorCall<UserType[]>('user.get');

    const isEmpty = (localRole: string) => {
        if(localRole == '' || localRole == undefined)
            return false;
        else
            return true;
    }

    const isExist = (name: string) => {
        if (users?.filter(user => user.username == name) == undefined)
            return false;
        else
            return true;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} title={title}>
            <Stack spacing={2} width={'100%'}>
                <TextField {...register('username', {validate: (name) => isExist(name) })} name="username" label="Имя пользователя" />
                <div style={{color: "red"}}>
                    {errors?.username && <p>{"Пользователь с таким именем уже существует"}</p>}
                </div>
                {!user && <><TextField {...register('password')} name="password" label="Пароль" type="password" />
                    <div style={{color: "red"}}>
                        {errors?.password && <p>{"Обязательное поле"}</p>}
                    </div></>}
                <InputLabel>Роль</InputLabel>
                <Controller
                    render={({ field }) => {
                        return (
                            <Select
                                {...field}
                                options={[
                                    { value: RolesEnum.ADMIN, label: 'Админ' },
                                    { value: RolesEnum.USER, label: 'Пользователь' },
                                ]}
                            />
                        );
                    }}
                    name={'role'}
                    control={control}
                    rules={{
                        required: {value: true, message: 'Обязательное поле'},
                        validate: (localRole) => isEmpty(localRole)
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
