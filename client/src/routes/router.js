import Dashboard from '../views/dashboard/dashboard';
import CandidateDatatable from '../views/tables/candidate-table';
import PositionDatatable from '../views/tables/position-table';
import Calendar from '../views/calendar/calendar';

var ThemeRoutes = [
	{
		navlabel: true,
		name: "Personal",
		icon: "mdi mdi-dots-horizontal",
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		icon: 'ti-dashboard',
		child: [{
            path: "/dashboards/classic",
            name: "Classic",
            mini: "B",
            icon: "mdi mdi-adjust",
            component: Dashboard
		}]
	},
	{
        navlabel: true,
        name: "Tables",
        icon: "mdi mdi-dots-horizontal",
	},
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
        navlabel: true,
        name: "Calendar",
        icon: "mdi mdi-dots-horizontal",
	},
	{
        path: '/calendar',
        name: 'Calendar',
        icon: 'mdi mdi-calendar',
        component: Calendar
    },
	{ path: '/', pathTo: '/dashboard', name: 'Dashboard', redirect: true }
];
export default ThemeRoutes;
