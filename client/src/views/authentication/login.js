import React from 'react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    CustomInput,
    FormGroup,
    Row,
    Col,
    UncontrolledTooltip,
    Button
} from 'reactstrap';

//ICS images
import ICEmailLogo from '../../assets/images/ICEmailLogo.png';
import DoS3 from '../../assets/images/DoS3.jpg';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../../helpers/authentication';


const sidebarBackground = {
    backgroundImage: "url(" + DoS3 + ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "85%"
};

const Login = (props) => {

    const handleClick = () => {
        var elem = document.getElementById('loginform');
        elem.style.transition = "all 2s ease-in-out";
        elem.style.display = "none";
        document.getElementById('recoverform').style.display = "block";
    }

    return <div className="">
        {/*--------------------------------------------------------------------------------*/}
        {/*Login Cards*/}
        {/*--------------------------------------------------------------------------------*/}
        <div className="auth-wrapper d-flex no-block justify-content-center align-items-center" style={sidebarBackground}>
            <div className="auth-box on-sidebar">
                <div id="loginform">
                    <div className="logo">
                        <span className="db"><img src={ICEmailLogo} alt="ICEmailLogo" /></span>
                        <h5 className="font-medium mb-3" id="signin">Sign in to the RecruiterTron!</h5>
                    </div>
                    <Row>
                        <Col xs="12">
                            <Formik
                                initialValues={{
                                    // username: 'test',
                                    // password: 'test'
                                }}
                                validationSchema={Yup.object().shape({
                                    username: Yup.string().required('Username is required'),
                                    password: Yup.string().required('Password is required')
                                })}
                                onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                                    setStatus();
                                    login(username, password)
                                        .then(
                                            res => {
                                                const { from } = props.location.state || { from: { pathname: "/" } };
                                                props.history.push(from);
                                            },
                                            error => {
                                                setSubmitting(false);
                                                setStatus("Incorrect username or password");
                                            }
                                        );
                                }}
                                render={({ errors, status, touched, isSubmitting }) => (
                                    <Form className="mt-3" id="loginform">
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ti-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>

                                            <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="ti-pencil"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                            <ErrorMessage name="password" component="div" className="invalid-feedback" />

                                        </InputGroup>
                                        <Row className="mb-3">
                                            <Col xs="12">
                                                <button type="submit" className="btn btn-block btn-submit btn-primary" disabled={isSubmitting}>Login</button>
                                            </Col>
                                        </Row>
                                        {status &&
                                            <div className={'alert alert-danger'}>{status}</div>
                                        }
                                    </Form>
                                )}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    </div>;
}

export default Login;
