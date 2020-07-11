import Fulllayout from '../layouts/fulllayout.js';
import Blanklayout from '../layouts/blanklayout.js';

var indexRoutes = [
	{ path: "/authentication", name: "Authentication", component: Blanklayout },
    { path: "/", name: "Dashboard", component: Fulllayout }
    // { path: "/admin", nameL "Admin, component: Admin"}
];

export default indexRoutes;
