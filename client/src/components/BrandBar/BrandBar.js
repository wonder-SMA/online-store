import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Row } from 'react-bootstrap';
import { StoreContext } from '../../index';

const BrandBar = observer(() => {
  const { device } = useContext(StoreContext);

  return (
    <Row className="d-flex">
      {device.brands.map(brand =>
        <Card
          key={brand.id}
          className="p-3 me-2"
          style={{ cursor: 'pointer', width: 'auto' }}
          onClick={() => device.setSelectedBrand(brand)}
          border={brand.id === device.selectedBrand?.id ? 'danger' : 'light'}
        >
          {brand.name}
        </Card>
      )}
    </Row>
  );
});

export default BrandBar;
