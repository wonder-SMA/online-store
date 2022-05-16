import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Col, Container, Row } from 'react-bootstrap';
import { fetchBrands, fetchTypes, fetchDevices } from '../../../http/deviceApi';
import { StoreContext } from '../../../index';
import BrandBar from '../../BrandBar';
import DeviceList from '../../DeviceList';
import Pages from '../../Pages';
import TypeBar from '../../TypeBar';

const Shop = observer(() => {
  const { device } = useContext(StoreContext);

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data));
    fetchBrands().then(data => device.setBrands(data));
    fetchDevices(null, null, device.page, device.limit).then(data => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchDevices(device.selectedType?.id, device.selectedBrand?.id, device.page, device.limit).then(data => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.selectedType?.id, device.selectedBrand?.id, device.page, device.limit]);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
