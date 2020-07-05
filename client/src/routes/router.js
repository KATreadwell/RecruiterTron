import Dashboard from '../views/dashboard/dashboard';

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
		component: Dashboard
	},
	{ path: '/', pathTo: '/dashboard', name: 'Dashboard', redirect: true }
];
export default ThemeRoutes;
