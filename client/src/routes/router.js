import Dashboard from '../views/dashboard/dashboard';
import CandidateDatatable from '../views/tables/candidate-table';
import PositionDatatable from '../views/tables/position-table';
import Calendar from '../views/calendar/calendar';
import Chartjs from '../views/charts/chartjs';
import Admin from '../views/admin/admin';
import UserDatatable from '../views/tables/user-table';


var ThemeRoutes = {
        Admin: [
        {
                path: '/tables/candidate',
                name: 'Candidate',
                icon: 'mdi mdi-border-inside',
                component: CandidateDatatable
        },
        {
                path: '/tables/position',
                name: 'Position',
                icon: 'mdi mdi-border-inside',
                component: PositionDatatable
        },
        {
                path: '/calendar',
                name: 'Calendar',
                icon: 'mdi mdi-calendar',
                component: Calendar
        },
        {
                path: '/charts/chartjs',
                name: 'Reports',
                icon: 'mdi mdi-blur',
                component: Chartjs
        },
        {
                path: '/users',
                name: 'Admin',
                icon: 'ti-ticket',
                component: UserDatatable
        },

        { path: '/', pathTo: '/home', name: 'Home', redirect: true }
],
nonAdmin: [
        {
                path: '/tables/candidate',
                name: 'Candidate',
                icon: 'mdi mdi-border-inside',
                component: CandidateDatatable
        },
        {
                path: '/tables/position',
                name: 'Position',
                icon: 'mdi mdi-border-inside',
                component: PositionDatatable
        },
        {
                path: '/calendar',
                name: 'Calendar',
                icon: 'mdi mdi-calendar',
                component: Calendar
        },
        {
                path: '/charts/chartjs',
                name: 'Reports',
                icon: 'mdi mdi-blur',
                component: Chartjs
        },
        
        { path: '/', pathTo: '/home', name: 'Home', redirect: true }
]
}

export default ThemeRoutes;
