import React, { useState } from 'react';

import { useParams } from 'react-router-dom';

import '../index.css';

import Box from '@mui/material/Box';
import { Meteor } from 'meteor/meteor';

import { Loader } from '/imports/ui/shared/ui/Loader';
import { useMeteorCall } from '/imports/ui/shared/hooks/useMeteorCall';
import { ItemsList } from '/imports/ui/widgets/ItemsList';
import { Professor } from '/imports/api/professors';

export const ProfessorView = () => {
    const params = useParams<{ id: string }>();
    const { data: professor, isLoading, request } = useMeteorCall<Professor>('professors.getById', { id: params.id });

    const [createVisible, setCreateVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);

    if (isLoading) {
        return <Loader />;
    }
    const toggleCreateVisible = () => {
        setCreateVisible((prev) => !prev);
    };

    const toggleEditVisible = () => {
        setEditVisible((prev) => !prev);
    };

    return (
        <div className="pageView">
            <h1>Профессор {`${professor?.lastname} ${professor?.firstname} ${professor?.middlename} `}</h1>
            <Box borderRadius="8px" border={'1px solid blue'} padding={'10px'} display="flex" flexDirection="column">
                <h2>Информация о профессоре</h2>
                <div>{`Фамилия: ${professor?.lastname}`}</div>
                <div>{`Имя: ${professor?.firstname}`}</div>
                <div>{`Отчество: ${professor?.middlename}`}</div>
            </Box>
        </div>
    );
};
