import React from "react";
import {Navigate, useRoutes} from "react-router-dom";
import { LoginForm } from './components/LoginForm';
import { PublicRoute } from './components/PublicRoute';
import { RoleRoute } from '/imports/ui/components/RoleRoute';
import { RolesEnum } from '/imports/api/user';
import { ProtectedRoute } from "./components/ProtectedRoute";
import {usersRoutes} from "/imports/ui/pages/Users/routes";
import {professorsRoutes} from "/imports/ui/pages/Professors/routes";
import {groupsRoutes} from "/imports/ui/pages/Groups/routes";
import {scheduleRoutes} from "/imports/ui/pages/Schedules/routes";

export const App = () => {
    return useRoutes([
        {
            element: <ProtectedRoute />,
            children: [
                ...usersRoutes,
                ...professorsRoutes,
                ...groupsRoutes,
                ...scheduleRoutes
            ],
        },
        {
            element: <PublicRoute />,
            children: [{ path: '/login', element: <LoginForm /> }],
        },
        {
            element: <RoleRoute roles={[RolesEnum.ADMIN]} />,
            children: [...usersRoutes],
        },
        {
            element: <Navigate to={'/schedules'} />,
            path: '*',
        },
    ]);
}