import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { createDevice, fetchBrands, fetchTypes } from '../../../http/deviceApi';
import { StoreContext } from '../../../index';

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(StoreContext);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data));
    fetchBrands().then(data => device.setBrands(data));
  }, []);

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => {
      return i.number === number ? { ...i, [key]: value } : i;
    }));
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('typeId', device.selectedType.id);
    formData.append('brandId', device.selectedBrand.id);
    formData.append('info', JSON.stringify(info));
    formData.append('img', file);
    createDevice(formData).then(data => onHide());
  };

  const selectFile = e => {
    setFile(e.target.files[0]);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{device.selectedType?.name || 'Выберите тип'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map(type =>
                <Dropdown.Item
                  key={type.id}
                  onClick={() => device.setSelectedType(type)}
                >
                  {type.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2">
            <Dropdown.Toggle>{device.selectedBrand?.name || 'Выберите бренд'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map(brand =>
                <Dropdown.Item
                  key={brand.id}
                  onClick={() => device.setSelectedBrand(brand)}
                >
                  {brand.name}
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Введите название устройства"
            className="mt-3"
          />
          <Form.Control
            value={price}
            onChange={e => setPrice(+e.target.value)}
            placeholder="Введите стоимость устройства"
            className="mt-3"
            type="number"
          />
          <Form.Control
            type="file"
            className="mt-3"
            onChange={selectFile}
          />
          <hr />
          <Button variant="outline-dark" onClick={addInfo}>Добавить новое свойство</Button>
          {info.map(i =>
            <Row key={i.number} className="mt-4">
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) => changeInfo('title', e.target.value, i.number)}
                  placeholder="Введите название свойства"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) => changeInfo('description', e.target.value, i.number)}
                  placeholder="Введите описание свойства"
                />
              </Col>
              <Col md={4}>
                <Button
                  variant="outline-danger"
                  onClick={() => removeInfo(i.number)}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
        <Button variant={'outline-success'} onClick={addDevice}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
