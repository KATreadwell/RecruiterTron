import Dashboard from '../views/dashboard/dashboard';
import CandidateDatatable from '../views/tables/candidate-table';
import PositionDatatable from '../views/tables/position-table';
import Calendar from '../views/calendar/calendar';
import Chartjs from '../views/charts/chartjs';
import Admin from '../views/admin/admin';
// import UserDatatable from '../views/tables/user-table';


var ThemeRoutes = {
        Admin: [
        // {
        // 	navlabel: true,
        // 	name: "Personal",
        // 	icon: "mdi mdi-dots-horizontal",
        // },

        // {
        // navlabel: true,
        // name: "Tables",
        // icon: "mdi mdi-dots-horizontal",
        // },
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
        // {
        // navlabel: true,
        // name: "Calendar",
        // icon: "mdi mdi-dots-horizontal",
        // },
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
        // {
        //         path: '/dashboard',
        //         name: 'Dashboard',
        //         icon: 'ti-dashboard',
        //         child: [{
        //                 path: "/dashboards/classic",
        //                 name: "Classic",
        //                 mini: "B",
        //                 icon: "mdi mdi-adjust",
        //                 component: Dashboard
        //         }]
        // },
        {
                path: '/admin',
                name: 'Admin',
                icon: 'ti-ticket',
                component: Admin
        },

        { path: '/', pathTo: '/home', name: 'Home', redirect: true }
],
nonAdmin: [
// {
        // 	navlabel: true,
        // 	name: "Personal",
        // 	icon: "mdi mdi-dots-horizontal",
        // },

        // {
        // navlabel: true,
        // name: "Tables",
        // icon: "mdi mdi-dots-horizontal",
        // },
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
        // {
        // navlabel: true,
        // name: "Calendar",
        // icon: "mdi mdi-dots-horizontal",
        // },
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
        // {
        //         path: '/dashboard',
        //         name: 'Dashboard',
        //         icon: 'ti-dashboard',
        //         child: [{
        //                 path: "/dashboards/classic",
        //                 name: "Classic",
        //                 mini: "B",
        //                 icon: "mdi mdi-adjust",
        //                 component: Dashboard
        //         }]
        // },
        { path: '/', pathTo: '/home', name: 'Home', redirect: true }
]
}

export default ThemeRoutes;
