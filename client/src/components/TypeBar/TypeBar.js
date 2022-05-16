import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { ListGroup } from 'react-bootstrap';
import { StoreContext } from '../../index';

const TypeBar = observer(() => {
  const { device } = useContext(StoreContext);
  return (
    <ListGroup>
      {device.types.map(type =>
        <ListGroup.Item
          key={type.id}
          style={{ cursor: 'pointer' }}
          onClick={() => device.setSelectedType(type)}
          active={device.selectedType?.id === type.id}
        >
          {type.name}
        </ListGroup.Item>
      )}
    </ListGroup>
  );
});

export default TypeBar;
