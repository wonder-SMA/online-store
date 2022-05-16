import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import star from '../../assets/star.png';
import { DEVICE_ROUTE } from '../utils/consts';

const DeviceItem = ({ device }) => {
  return (
    <Col md={3} className="mt-3">
      <Link to={DEVICE_ROUTE + '/' + device.id}>
        <Card
          className="p-1 d-flex justify-content-center align-items-center"
          style={{ width: 170, cursor: 'pointer' }}
          border="dark"
        >
          <Image width="150" height="150" src={process.env.REACT_APP_API_URL + device.img} />
          <div className="text-black-50 d-flex justify-content-between align-items-center" style={{ width: '100%' }}>
            <div>Samsung...</div>
            <div className="mt-1 d-flex align-items-center">
              <div className="me-1">{device.rating}</div>
              <Image width="14" height="14" src={star} />
            </div>
          </div>
          <div style={{ width: '100%' }}>{device.name}</div>
        </Card>
      </Link>
    </Col>
  );
};

export default DeviceItem;
