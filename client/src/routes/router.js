import CandidateDatatable from '../views/tables/candidate-table';
import PositionDatatable from '../views/tables/position-table';
import Chartjs from '../views/charts/chartjs';
import UserDatatable from '../views/tables/user-table';
import Google from '../views/google/google';
import Home from '../views/home/home';

export const Routes = [
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
        {
                path: '/charts/chartjs',
                name: 'Reports',
                icon: 'fas fa-chart-pie',
                component: Chartjs
        }
]

export const AdminRoutes = Routes.concat([
        {
                path: '/admin',
                name: 'Admin',
                icon: 'fas fa-ticket-alt',
                component: UserDatatable
        }
]);


export const Redirects = [
        {
                from: '/',
                to: '/home'
        }
]
