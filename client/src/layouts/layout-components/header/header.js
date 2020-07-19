import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, Button, Navbar, NavbarBrand, Collapse, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledCarousel, Progress, ListGroup, ListGroupItem, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import * as data from './data';
import { logout}  from '../../../helpers/authentication';
import logolighttext from '../../../assets/images/logo-light-text.png';


//ICS-branded images
import ICEmailLogo from '../../../assets/images/ICEmailLogo.png';
import ICLogo from '../../../assets/images/ICwhitelogo.png';


export default () => {

    const [isOpen, setIsOpen] = useState(false);

    const settings = useSelector((state) => state.settings);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const showMobilemenu = () => {
        document.getElementById('main-wrapper').classList.toggle('show-sidebar');
    }

    const sidebarHandler = () => {
        let element = document.getElementById('main-wrapper');
        switch (settings.activeSidebarType) {
            case 'full':
            case 'iconbar':
                element.classList.toggle('mini-sidebar');
                if (element.classList.contains('mini-sidebar')) {
                    element.setAttribute('data-sidebartype', 'mini-sidebar');
                } else {
                    element.setAttribute('data-sidebartype', settings.activeSidebarType);
                }
                break;

            case 'overlay':
            case 'mini-sidebar':
                element.classList.toggle('full');
                if (element.classList.contains('full')) {
                    element.setAttribute('data-sidebartype', 'full');
                } else {
                    element.setAttribute('data-sidebartype', settings.activeSidebarType);
                }
                break;
            default:
        }
    };

    return (
        <header className="topbar navbarbg" data-navbarbg={settings.activeNavbarBg}>
            <Navbar className={"top-navbar " + (settings.activeNavbarBg === "skin6" ? 'navbar-light' : 'navbar-dark')} expand="md">
                <div className="navbar-header" id="logobg" data-logobg={settings.activeLogoBg}>
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Mobile View Toggler  [visible only after 768px screen]                         */}
                    {/*--------------------------------------------------------------------------------*/}
                    <span className="nav-toggler d-block d-md-none" onClick={showMobilemenu.bind(null)}>
                        <i className="ti-menu ti-close" />
                    </span>
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
                    {/*--------------------------------------------------------------------------------*/}
                    <NavbarBrand href="/">
                        <span className="logo-text">
                            <img src={ICEmailLogo} alt="homepage" className="dark-logo" />
                            <img
                                src={logolighttext}
                                className="light-logo"
                                alt="homepage"
                            />
                        </span>
                    </NavbarBrand>
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Mobile View Toggler  [visible only after 768px screen]                         */}
                    {/*--------------------------------------------------------------------------------*/}
                    <span className="topbartoggler d-block d-md-none" onClick={toggle.bind(null)}>
                        <i className="ti-more" />
                    </span>
                </div>
                <Collapse className="navbarbg" isOpen={isOpen} navbar data-navbarbg={settings.activeNavbarBg} >
                    <Nav className="float-left" navbar>
                        <NavItem>
                            <NavLink href="#" className="d-none d-md-block" onClick={sidebarHandler.bind(null)}>
                                <i className="ti-menu" />
                            </NavLink>
                        </NavItem>
                        {/*--------------------------------------------------------------------------------*/}
                        {/* Start Mega Menu Dropdown                                                       */}
                        {/*--------------------------------------------------------------------------------*/}
                        <UncontrolledDropdown nav inNavbar className="mega-dropdown">
                            <DropdownToggle nav> Recruiter Resources <i className="fa fa-angle-down" /></DropdownToggle>
                            <DropdownMenu>
                                <Row>
                                    {/*--------------------------------------------------------------------------------*/}
                                    {/* Carousel [Item-1]                                                              */}
                                    {/*--------------------------------------------------------------------------------*/}
                                    <Col xs="12" sm="12" md="12" lg="2">
                                        <h5 className="mb-3 text-uppercase">Top Clients</h5>
                                        <UncontrolledCarousel items={data.items} />
                                    </Col>
                                    {/*--------------------------------------------------------------------------------*/}
                                    {/* Progress [Item-2]                                                              */}
                                    {/*--------------------------------------------------------------------------------*/}
                                    <Col xs="12" sm="12" md="12" lg="3">
                                        <h5 className="mb-3 text-uppercase">Important Contacts</h5>
                                        <ListGroup flush>
                                            <ListGroupItem
                                                className="border-0 pl-0 text-dark pt-0">
                                                <i className="fas fa-hand-point-right" />
                                                <span> Phone: (877) 535-8767</span>
                                            </ListGroupItem>
                                            <ListGroupItem
                                                className="border-0 pl-0 text-dark pt-0">
                                                <i className="fas fa-hand-point-right" />
                                                <span> Email: RecruitmentCA@icsecurity.com</span>
                                            </ListGroupItem>
                                        </ListGroup>
                                    </Col>
                                    
                                    {/*--------------------------------------------------------------------------------*/}
                                    {/* List Style [Item-4]                                                            */}
                                    {/*--------------------------------------------------------------------------------*/}
                                    <Col xs="12" sm="12" md="12" lg="3">
                                        <h5 className="mb-3 text-uppercase">Recruiter's Checklist</h5>
                                        <ListGroup flush>
                                            <ListGroupItem
                                                className="border-0 pl-0 text-dark pt-0"
                                            >
                                                <i className="fa fa-check text-success mr-2" />
													Background Check
                                            </ListGroupItem>
                                            <ListGroupItem
                                                className="border-0 pl-0 text-dark pt-0"
                                            >
                                                <i className="fa fa-check text-success mr-2" />
													Drug Screen (5-Panel or 8-Panel)
                                            </ListGroupItem>
                                            <ListGroupItem
                                                className="border-0 pl-0 text-dark pt-0"
                                            >
                                                <i className="fa fa-check text-success mr-2" />
													Physical (Vaccines, TB Shot)
                                            </ListGroupItem>
                                            <ListGroupItem
                                                className="border-0 pl-0 text-dark pt-0"
                                            >
                                                <i className="fa fa-check text-success mr-2" />
													I-9 (US Passport OR Driver's License)
                                            </ListGroupItem>
                                            <ListGroupItem
                                                className="border-0 pl-0 text-dark pt-0"
                                            >
                                                <i className="fa fa-check text-success mr-2" />
													State Guard Card
                                            </ListGroupItem>
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <Nav className="ml-auto float-right" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className="pro-pic">
                                <img
                                    src={ICLogo}
                                    alt="user"
                                    className="square"
                                    width="31"
                                />
                            </DropdownToggle>
                            <DropdownMenu right className="user-dd">
                                <span className="with-arrow">
                                    <span className="bg-primary" />
                                </span>
                                <div className="d-flex no-block align-items-center p-3 bg-primary text-white mb-2">
                                </div>
                                <DropdownItem onClick={() => { logout(); window.location.reload(); } }>
                                <i className="fa fa-power-off mr-1 ml-1" /> Logout
                                </DropdownItem>
                                <DropdownItem divider />
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    );
}
