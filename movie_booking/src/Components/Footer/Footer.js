import React from 'react';
import { Layout, Row, Col } from 'antd';
import { MailOutlined, InfoCircleOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';

import CNEMA from '../Assets/CNEMA.png';

import './styleFooter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';

const { Footer } = Layout;

const MyFooter = () => {
    return (
        <Footer className='footerCnema'>
            <div className='footerContainer'>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <div className='colu col_1'>
                            <img src={CNEMA} alt='CNEMA Logo' />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <div className='colu col_2'>
                            <div className='content'>
                                <h5>Company</h5>
                                <span><MailOutlined /> Contact us</span>
                                <span><InfoCircleOutlined /> About</span>
                                <span><FontAwesomeIcon icon={faHandshake}/>Partner</span>
                            </div>
                            <div className='content'>
                                <h5>About</h5>
                                <span>Cinema</span>
                                <span>My Ticket</span>
                                <span>Payment</span>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <div className='colu col_3'>
                            <div className='content'>
                                <h5>CEO and Co-founders</h5>
                                <span>Tuan Nguyen</span>
                                <span>Tran Thuan</span>
                                <span>Tan Anh</span>
                            </div>
                            <div className='contact-info'>
                                <h5>Contact Info</h5>
                                <span><EnvironmentOutlined /> HCM City</span>
                                <span><PhoneOutlined /> +123 456 7890</span>
                                <span><MailOutlined /> IU@WAD.com</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Footer>
    );
};

export default MyFooter;
