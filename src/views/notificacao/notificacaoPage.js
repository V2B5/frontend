import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Alert, Form } from 'react-bootstrap';
import api from '../api/api';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    const fetchNotificacoes = async () => {
      try {
        const response = await api.get('/notificacao');
        if (response.data.status === 'success') {
          setNotificacoes(response.data.data.notificacoes);
        } else {
          console.error('Erro ao obter notificações:', response.data.message);
        }
      } catch (error) {
        console.error('Erro ao encontrar notificações:', error);
      }
    };

    fetchNotificacoes();
  }, []);

  return (
    <Container className="py-4">
      <h1 className="text-primary mb-4 fw-bold" align="center">Notificações</h1>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Não Lidas</Card.Title>
              {notificacoes.filter((n) => !n.estado).length === 0 ? (
                <Alert variant="info">Não há notificações não lidas.</Alert>
              ) : (
                <ListGroup>
                  {notificacoes.filter((n) => !n.estado).map((notificacao) => (
                    <ListGroup.Item key={notificacao.id} className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{notificacao.titulo}</strong>
                        <p>{notificacao.descricao}</p>
                        <small>{moment(notificacao.data).fromNow()}</small>
                      </div>
                      <Form.Check type="checkbox" />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Lidas</Card.Title>
              {notificacoes.filter((n) => n.estado).length === 0 ? (
                <Alert variant="info">Não há notificações lidas.</Alert>
              ) : (
                <ListGroup>
                  {notificacoes.filter((n) => n.estado).map((notificacao) => (
                    <ListGroup.Item key={notificacao.id} className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{notificacao.titulo}</strong>
                        <p>{notificacao.descricao}</p>
                        <small>{moment(notificacao.data).fromNow()}</small>
                      </div>
                      <Form.Check type="checkbox" />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
