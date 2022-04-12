// import hook
import React, { useEffect, useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import Navbar from '../components/Navbar';

// import components here
import Contact from '../components/complain/Contact';

// import socket.io-client
import { io } from 'socket.io-client';

// initial variable outside component
let socket;
export default function Complain() {
  const [contact, setContact] = useState({});
  const [contacts, setContacts] = useState([]);

  const title = 'Complain';
  document.title = 'DumbMerch | ' + title;

  useEffect(() => {
    socket = io('http://localhost:5000');

    loadContact();

    return () => {
      socket.disconnect();
    };
  }, []);

  const loadContact = () => {
    socket.emit('load admin contact');

    socket.on('admin contact', (data) => {
      const dataContact = data?.map((item) => ({
        ...item,
        message: 'Click here to start message',
      }));
      setContacts(dataContact);
    });
  };

  const onClickContact = (data) => {
    setContact(data);
  };

  return (
    <>
      <Navbar title={title} />
      <Container fluid style={{ height: '89.5vh' }}>
        <Row>
          <Col md={3} style={{ height: '89.5vh' }}>
            <Contact
              clickContact={onClickContact}
              dataContact={contacts}
              contact={contact}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
