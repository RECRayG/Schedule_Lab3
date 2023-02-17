import React, { useState } from 'react';

import { generatePath, useNavigate } from 'react-router-dom';

import { Meteor } from 'meteor/meteor';

import { Loader } from '/imports/ui/shared/ui/Loader';
import { useMeteorCall } from '/imports/ui/shared/hooks/useMeteorCall';
import { ItemsList } from '/imports/ui/widgets/ItemsList';
import { ProfessorFields } from '/imports/ui/components/ProfessorsModal/ProfessorsForm';

import { ProfessorModal } from '../../components/ProfessorsModal';

import { routes } from './routes';

import { Professor } from '/imports/api/professors';

export const ProfessorsList = () => {
    const { data: professors, isLoading, request } = useMeteorCall<Professor[]>('professors.get');
    const [createVisible, setCreateVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [currentProfessor, setCurrentProfessor] = useState<Professor>();
    const navigate = useNavigate();

    if (isLoading) {
        return <Loader />;
    }

    const mappedList = professors?.map(({ lastname, firstname, middlename, _id }) => ({
        info: `${lastname} ${firstname} ${middlename}`,
        id: _id,
    }));
    const toggleCreateVisible = () => {
        setCreateVisible((prev) => !prev);
    };

    const toggleEditVisible = () => {
        setEditVisible((prev) => !prev);
    };
    const onSubmitCreate = async (values: ProfessorFields) => {
        values.lastname = values.lastname.trim();
        if(values.lastname == "")
            values.lastname = "-";

        values.firstname = values.firstname.trim();
        if(values.firstname == "")
            values.firstname = "-";

        values.middlename = values.middlename.trim();
        if(values.middlename == "")
            values.middlename = "-";

        values.lastname = values.lastname.replace(" ", "-");
        values.firstname = values.firstname.replace(" ", "-");
        values.middlename = values.middlename.replace(" ", "-");

        values.lastname = values.lastname.split(" ").reduce((acc, value) => acc + value);
        values.firstname = values.firstname.split(" ").reduce((acc, value) => acc + value);
        values.middlename = values.middlename.split(" ").reduce((acc, value) => acc + value);

        await Meteor.callAsync('professors.insert', { professor: values });
        toggleCreateVisible();
        await request();
    };

    const onSubmitEdit = async (values: ProfessorFields) => {
        values.lastname = values.lastname.trim();
        if(values.lastname == "")
            values.lastname = "-";

        values.firstname = values.firstname.trim();
        if(values.firstname == "")
            values.firstname = "-";

        values.middlename = values.middlename.trim();
        if(values.middlename == "")
            values.middlename = "-";

        values.lastname = values.lastname.replace(" ", "-");
        values.firstname = values.firstname.replace(" ", "-");
        values.middlename = values.middlename.replace(" ", "-");

        values.lastname = values.lastname.split(" ").reduce((acc, value) => acc + value);
        values.firstname = values.firstname.split(" ").reduce((acc, value) => acc + value);
        values.middlename = values.middlename.split(" ").reduce((acc, value) => acc + value);

        await Meteor.callAsync('professors.update', {
            request: { ...values, prevLastname: currentProfessor?.lastname },
        });
        toggleEditVisible();
        await request();
    };

    const onEdit = async (id: string) => {
        const professor = await Meteor.callAsync('professors.getById', { id });
        console.log('professor', professor);
        setCurrentProfessor(professor);
        toggleEditVisible();
    };
    const onDelete = async (id: string) => {
        Meteor.call('professors.remove', { professorId: id });
        await request();
    };

    const onItemClick = (id: string) => {
        navigate(generatePath(routes.view, { id }));
    };

    return (
        <>
            <ItemsList
                data={mappedList ?? []}
                title={'Профессоры'}
                onDeleteItem={onDelete}
                onEditItem={onEdit}
                onCreate={toggleCreateVisible}
                onItemClick={onItemClick}
            />
            <ProfessorModal visible={createVisible} onClose={toggleCreateVisible} onSubmit={onSubmitCreate}/>
            <ProfessorModal
                visible={editVisible}
                onClose={toggleEditVisible}
                onSubmit={onSubmitEdit}
                professor={currentProfessor}
                submitText={'Сохранить'}
            />
        </>
    );
};
