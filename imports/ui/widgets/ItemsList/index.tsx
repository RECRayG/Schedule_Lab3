import React, {useCallback, useEffect, useState} from 'react';

import { Delete, Edit } from '@mui/icons-material';
import {Box, Button, IconButton, InputLabel, Stack, TextareaAutosize} from '@mui/material';
import {RolesEnum, UserType} from "/imports/api/user";
import {Meteor} from "meteor/meteor";
import {useMeteorCall} from "/imports/ui/shared/hooks/useMeteorCall";
// import {UserFields} from "/imports/ui/components/UsersModal/UsersForm";
import './TextStyles.css'
import {UserFields} from "/imports/ui/components/UsersModal/UsersForm";
import {Controller} from "react-hook-form";
import {Schedule} from "/imports/api/schedules";
import {Group} from "/imports/api/groups";
import {Select} from "/imports/ui/shared/ui/Select";
import {SchedulesList} from "/imports/ui/pages/Schedules";
import {ProfessorFields} from "/imports/ui/components/ProfessorsModal/ProfessorsForm";
import {Professor} from "/imports/api/professors";

type Props = {
  title: string;
  data?: Array<{ id: string; info: string }>;
  onDeleteItem?: (id: string) => void;
  onEditItem?: (id: string) => void;
  onItemClick?: (id: string) => void;
  onCreate?: () => void;
  dataSchedule?: Array<{ id: string; info: string; professor: string }>;
};
export const ItemsList: React.FC<Props> = ({ title, data, onDeleteItem, onEditItem, onItemClick, onCreate, dataSchedule }) => {
    if(title == "Расписание") {
        const {data: userRole} = useMeteorCall<string>('user.getUserRole');

        let i = 0;
        const day = () => {
            i++;
            if(i == 8) {
                i = 0;
                return false;
            }
            else if(i == 1) {
                return true;
            }
            else return false;
        }

        if (userRole == RolesEnum.ADMIN) {
            return (
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" marginTop="20px">
                    <Stack gap={2} width={'100%'}>
                        {dataSchedule?.map(({ info, id, professor}) => (
                            <>
                                { day() &&
                                    <h2>{info.split(" ")[2]}</h2>
                                }
                                {professor &&
                                    <Box key={id} className="TextStyle" border={'3px solid black'} borderRadius={'10px'} sx={{ backgroundColor: '#e6e6e6' }}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            spacing={1}
                                            padding={'10px'}
                                        >
                                            <div style={{ width: '100%' }}>
                                                <b>{info.split(" ")[3]}-{info.split(" ")[4]}</b>: {info.split(" ")[5]} ◉ {professor} ◉ {info.split(" ")[6]} ◉ {info.split(" ")[7]}
                                            </div>

                                            <Stack justifyContent="center" direction="row" gap="16px" className="edit-buttons">
                                                <IconButton
                                                    onClick={(e: React.MouseEvent) => {
                                                        e.stopPropagation();
                                                        if (onEditItem) onEditItem(id);
                                                    }}
                                                >
                                                    <Edit />
                                                </IconButton>

                                                <IconButton
                                                    onClick={(e: React.MouseEvent) => {
                                                        e.stopPropagation();
                                                        if (onDeleteItem) onDeleteItem(id);
                                                    }}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                }
                                {!professor &&
                                    <Box key={id} className="TextStyle" border={'3px solid black'} borderRadius={'10px'} sx={{ backgroundColor: '#e6e6e6' }}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            spacing={1}
                                            padding={'10px'}
                                        >
                                            <div style={{ width: '100%' }}>
                                                <b>{info.split(" ")[3]}-{info.split(" ")[4]}</b>:
                                            </div>

                                            <Stack justifyContent="center" direction="row" gap="16px" className="edit-buttons">
                                                <IconButton
                                                    onClick={(e: React.MouseEvent) => {
                                                        e.stopPropagation();
                                                        if (onEditItem) onEditItem(id);
                                                    }}
                                                >
                                                    <Edit />
                                                </IconButton>

                                                <IconButton
                                                    onClick={(e: React.MouseEvent) => {
                                                        e.stopPropagation();
                                                        if (onDeleteItem) onDeleteItem(id);
                                                    }}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                }
                            </>
                        ))}
                    </Stack>
                </Box>
            );
        } else {
            return (
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" marginTop="20px">
                    <Stack gap={2} width={'100%'}>
                        {dataSchedule?.map(({ info, id, professor}) => (
                            <>
                                { day() &&
                                    <h2>{info.split(" ")[2]}</h2>
                                }
                                {professor &&
                                    <Box key={id} className="TextStyle" border={'3px solid black'} borderRadius={'10px'} sx={{ backgroundColor: '#e6e6e6' }}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            spacing={1}
                                            padding={'10px'}
                                        >
                                            <div style={{ width: '100%' }}>
                                                <b>{info.split(" ")[3]}-{info.split(" ")[4]}</b>: {info.split(" ")[5]} ◉ {professor} ◉ {info.split(" ")[6]} ◉ {info.split(" ")[7]}
                                            </div>
                                        </Stack>
                                    </Box>
                                }
                                {!professor &&
                                    <Box key={id} className="TextStyle" border={'3px solid black'} borderRadius={'10px'} sx={{ backgroundColor: '#e6e6e6' }}>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            spacing={1}
                                            padding={'10px'}
                                        >
                                            <div style={{ width: '100%' }}>
                                                <b>{info.split(" ")[3]}-{info.split(" ")[4]}</b>:
                                            </div>
                                        </Stack>
                                    </Box>
                                }
                            </>
                        ))}
                    </Stack>
                </Box>
            );
        }
    }
    else
        if(title == "Расписание групп") {
        const {data: groups, request} = useMeteorCall<Group[]>('groups.get');
        const mappedListG = groups?.map(({ groupName, _id }) => ({
            label: groupName,
            value: _id,
        }));

        let listNumberOfWeek = [{label: '', value: 0}]
        for (let i = 1; i <= 18; i += 1) {
            listNumberOfWeek[i - 1] = {label: i.toString(), value: i};
        }

        const [currGroup, setCurrGroup] = useState<Group>();
        const [oldGroup, setOldGroup] = useState<Group>();
        const [currNumberOfWeek, setCurrNumberOfWeek] = useState<Number>(); //listNumberOfWeek?.at(0)!.value
        const [currentSchedules, setCurrentSchedules] = useState<Schedule[]>();

        const toggleGetSchedule = async () => {
            const {data: schedule} = useMeteorCall<Schedule[]>('schedules.getByGroupIdAndNumberOfWeek', { currGroup, currNumberOfWeek });
            console.log("Find SCHEDULE - ", schedule);
            setCurrentSchedules(schedule);
        };

        const getGroupValue = () => {
            return currGroup ? mappedListG!.find(g => g.value ===  currGroup._id) : ''
        }

        const onGroupChange = async (newValue: Group) => {
            setOldGroup(currGroup)
            setCurrGroup(newValue)
            await request();
            // setCurrentSchedules(schedules)
        }

        const getWeekValue = () => {
            return currNumberOfWeek ? listNumberOfWeek!.find(w => w.value ===  currNumberOfWeek) : 0
        }

        const onWeekChange = (newValue: Number) => {
            setCurrNumberOfWeek(newValue)
            // setCurrentSchedules(schedules)
        }

        return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Box width={'100%'} display="flex" flexDirection="row" justifyContent="flex-start" alignItems={'center'}>
                    <h2>{title}</h2>
                </Box>
                <Box width={'50%'} display="flex" flexDirection="row" justifyContent="space-between" alignItems={'center'}>
                    <div>
                    <InputLabel><h2>Группа:</h2></InputLabel>
                    <Select options={mappedListG} value={getGroupValue()} onChange={onGroupChange}
                            size={'small'}
                            variant="contained"
                            style={{ height: '40px', marginLeft: '15px' }} />
                    </div>
                    <div>
                    <InputLabel><h2>Номер недели:</h2></InputLabel>
                    <Select options={listNumberOfWeek} value={getWeekValue()} onChange={onWeekChange}
                            size={'small'}
                            variant="contained"
                            style={{ height: '40px', marginLeft: '15px' }} />
                    </div>
                </Box>

                {   currGroup &&
                    currNumberOfWeek &&
                    <SchedulesList oldGroup={oldGroup?.value} group={currGroup.value} numberOfWeek={currNumberOfWeek.label}></SchedulesList>}
            </Box>
        );
    } else {
          return (
              <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                  <Box width={'100%'} display="flex" flexDirection="row" justifyContent="flex-start" alignItems={'center'}>
                      <h2>{title}</h2>
                      <Button
                          size={'small'}
                          style={{ height: '40px', marginLeft: '15px' }}
                          variant="contained"
                          color="secondary"
                          disabled={!onCreate}
                          onClick={onCreate}
                      >
                          Создать
                      </Button>
                  </Box>
                  {!data?.length && <div>Пусто</div>}
                  <Stack gap={2} width={'100%'}>
                      {data?.map(({ info, id }) => (
                          <Box key={id} className="TextStyle" border={'3px solid black'} borderRadius={'10px'} sx={{ backgroundColor: '#e6e6e6' }}>
                              <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  onClick={() => {
                                      if (onItemClick) onItemClick(id);
                                  }}
                                  spacing={1}
                                  padding={'10px'}
                              >
                                  <div style={{ width: '100%' }}>{info}</div>

                                  <Stack justifyContent="center" direction="row" gap="16px" className="edit-buttons">
                                      <IconButton
                                          onClick={(e: React.MouseEvent) => {
                                              e.stopPropagation();
                                              if (onEditItem) onEditItem(id);
                                          }}
                                      >
                                          <Edit />
                                      </IconButton>

                                      <IconButton
                                          onClick={(e: React.MouseEvent) => {
                                              e.stopPropagation();
                                              if (onDeleteItem) onDeleteItem(id);
                                          }}
                                      >
                                          <Delete />
                                      </IconButton>
                                  </Stack>
                              </Stack>
                          </Box>
                      ))}
                  </Stack>
              </Box>
          );
      }
};
