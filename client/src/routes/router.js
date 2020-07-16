import Dashboard from '../views/dashboard/dashboard';
import CandidateDatatable from '../views/tables/candidate-table';
import PositionDatatable from '../views/tables/position-table';
import Calendar from '../views/calendar/calendar';
import Chartjs from '../views/charts/chartjs';
import UserDatatable from '../views/tables/user-table';
import Google from '../views/google/google';
import Home from '../views/home/home';


var ThemeRoutes = {
        Admin: [
                {
                        path: '/home',
                        name: 'Home',
                        icon: 'fas fa-home',
                        component: Home
                },
                {
                        path: '/tables/candidate',
                        name: 'Candidate',
                        icon: 'fas fa-user',
                        component: CandidateDatatable
                },
                {
                        path: '/tables/position',
                        name: 'Position',
                        icon: 'fas fa-briefcase',
                        component: PositionDatatable
                },
                {
                        path: '/google',
                        name: 'Google Maps',
                        icon: 'mdi mdi-google-maps',
                        component: Google
                },
                // {
                //         path: '/calendar',
                //         name: 'Calendar',
                //         icon: 'mdi mdi-calendar',
                //         component: Calendar
                // },
                {
                        path: '/charts/chartjs',
                        name: 'Reports',
                        icon: 'fas fa-chart-pie',
                        component: Chartjs
                },
                {
                        path: '/admin',
                        name: 'Admin',
                        icon: 'fas fa-ticket-alt',
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
