import React, { VFC } from 'react';

import { Box, Modal } from '@mui/material';

import { Professor } from '/imports/api/professors';
import { ProfessorFields, ProfessorForm } from '/imports/ui/components/ProfessorsModal/ProfessorsForm';

type Props = {
    onClose: () => void;
    visible: boolean;
    professor?: Professor;
    submitText?: string;
    onSubmit: (values: ProfessorFields) => void;
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    padding: '20px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

export const ProfessorModal: VFC<Props> = (props) => {
    return (
        <Modal open={props.visible}>
            <Box sx={style}>
                <ProfessorForm title="Создать пациента" onCancel={props.onClose} {...props} />
            </Box>
        </Modal>
    );
};
