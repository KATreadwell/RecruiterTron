import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './layout-components/header/header';
import Sidebar from './layout-components/sidebar/sidebar';
import Footer from './layout-components/footer/footer';
import Customizer from './layout-components/customizer/customizer';

import { Routes, AdminRoutes, Redirects } from '../routes/router';
import { getUser } from '../helpers/authentication';

export default (props) => {

    const [width, setWidth] = useState(window.innerWidth);

    const [sidebarRoutes, setSidebarRoutes] = useState(Routes);

    useEffect(() => {
        getUser().then(user => {
            if (user.admin) {
                setSidebarRoutes(AdminRoutes);
            }
        });
    }, [])

    const settings = useSelector((state) => state.settings);

    useEffect(() => {
        const updateDimensions = () => {
            let element = document.getElementById('main-wrapper');
            setWidth(window.innerWidth)
            switch (settings.activeSidebarType) {
                case 'full':
                case 'iconbar':
                    if (width < 1170) {
                        element.setAttribute("data-sidebartype", "mini-sidebar");
                        element.classList.add("mini-sidebar");
                    } else {
                        element.setAttribute("data-sidebartype", settings.activeSidebarType);
                        element.classList.remove("mini-sidebar");
                    }
                    break;

                case 'overlay':
                    if (width < 767) {
                        element.setAttribute("data-sidebartype", "mini-sidebar");
                    } else {
                        element.setAttribute("data-sidebartype", settings.activeSidebarType);
                    }
                    break;

                default:
            }
        };
        if (document.readyState === "complete") {
            updateDimensions();
        }
        window.addEventListener("load", updateDimensions.bind(null));
        window.addEventListener("resize", updateDimensions.bind(null));
        return () => {
            window.removeEventListener("load", updateDimensions.bind(null));
            window.removeEventListener("resize", updateDimensions.bind(null));
        };
    }, [settings.activeSidebarType, width]);

    return (
        <div
            id="main-wrapper"
            dir={settings.activeDir}
            data-theme={settings.activeTheme}
            data-layout={settings.activeThemeLayout}
            data-sidebartype={settings.activeSidebarType}
            data-sidebar-position={settings.activeSidebarPos}
            data-header-position={settings.activeHeaderPos}
            data-boxed-layout={settings.activeLayout}
        >
            {/*--------------------------------------------------------------------------------*/}
            {/* Header                                                                         */}
            {/*--------------------------------------------------------------------------------*/}
            <Header />
            {/*--------------------------------------------------------------------------------*/}
            {/* Sidebar                                                                        */}
            {/*--------------------------------------------------------------------------------*/}
            <Sidebar {...props} routes={sidebarRoutes} />
            {/*--------------------------------------------------------------------------------*/}
            {/* Page Main-Content                                                              */}
            {/*--------------------------------------------------------------------------------*/}
            <div className="page-wrapper d-block">
                <div className="page-content container-fluid">
                    <Switch>
                        {sidebarRoutes.map(({component, path}) => {
                            return (
                                <Route path={path} component={component} key={path} />
                            );
                        })}
                        {Redirects.map(({from, to}) => {
                            return (
                                <Redirect from={from} to={to} key={`${from}${to}`} />
                            );
                        })}
                    </Switch>
                </div>
                <Footer />
            </div>
            {/*--------------------------------------------------------------------------------*/}
            {/* Customizer from which you can set all the Layout Settings                      */}
            {/*--------------------------------------------------------------------------------*/}
            <Customizer />
        </div>
    );
}
