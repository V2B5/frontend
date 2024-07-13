import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form'; 
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import api from '../api/api';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  nome: yup.string().required('Nome do Estabelecimento é obrigatório'),
  descricao: yup.string().required('Descrição é obrigatória'),
  morada: yup.string().required('Morada é obrigatória'),
  area: yup.string().required('Área é obrigatória'),
  subarea: yup.string().required('Subárea é obrigatória'),
});

function CriarEstabelecimento({ handleClose }) {
  const { register, handleSubmit, watch, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [areas, setAreas] = useState([]);
  const [subareas, setSubareas] = useState([]);
  const selectedArea = watch('area');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/areas');
        setAreas(response.data.data);
      } catch (error) {
        console.error('Erro ao procurar áreas:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedArea) {
        try {
          const response = await api.get(`/areas/${selectedArea}`);
          setSubareas(response.data.data);
        } catch (error) {
          console.error('Erro ao procurar subáreas:', error);
        }
      } else {
        setSubareas([]);
      }
    };

    fetchData();
  }, [selectedArea]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      formData.append('estado', false);
      formData.append('idArea', selectedArea);
      formData.append('idSubarea', data.subarea);
      formData.append('telemovel', String(data.telemovel)); 
      formData.append('email', String(data.email)); 

      const response = await api.post('/estabelecimentos', formData);

      Swal.fire({
        title: "Sucesso",
        text: "Estabelecimento criado com sucesso!",
        icon: "success",
        confirmButtonColor: '#007bff',
      });

      console.log('Estabelecimento criado:', response.data);
      handleClose();  
    } catch (error) {
      Swal.fire({
        title: "Erro",
        text: "Erro ao criar estabelecimento, tente mais tarde.",
        icon: "error",
        confirmButtonColor: '#007bff',
      });

      console.error('Erro ao criar estabelecimento:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome do Estabelecimento</Form.Label>
              <Form.Control
                type="text"
                {...register('nome')}
                placeholder="Insira o nome do estabelecimento"
                isInvalid={!!errors.nome}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nome?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="descricao">
              <Form.Label>Descrição do Estabelecimento</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                {...register('descricao')}
                placeholder="Insira a descrição do estabelecimento"
                isInvalid={!!errors.descricao}
              />
              <Form.Control.Feedback type="invalid">
                {errors.descricao?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="morada">
              <Form.Label>Morada do Estabelecimento</Form.Label>
              <Form.Control
                type="text"
                {...register('morada')}
                placeholder="Insira a morada do estabelecimento"
                isInvalid={!!errors.morada}
              />
              <Form.Control.Feedback type="invalid">
                {errors.morada?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="telemovel">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                {...register('telemovel')}
                placeholder="Insira o número de telefone"
                isInvalid={!!errors.telemovel}
              />
              <Form.Control.Feedback type="invalid">
                {errors.telemovel?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register('email')}
                placeholder="Insira o email"
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="area">
              <Form.Label>Área</Form.Label>
              <Form.Control
                as="select"
                {...register('area')}
                isInvalid={!!errors.area}
              >
                <option value="">Selecione uma área</option>
                {areas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.nome}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.area?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="subarea">
              <Form.Label>Subárea</Form.Label>
              <Form.Control
                as="select"
                {...register('subarea')}
                isInvalid={!!errors.subarea}
              >
                <option value="">Selecione uma subárea</option>
                {subareas.map((subarea) => (
                  <option key={subarea.id} value={subarea.id}>
                    {subarea.nome}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.subarea?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Inserir Anexo</Form.Label>
              <Controller
                name="foto"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type="file"
                    onChange={(e) => field.onChange(e.target.files[0])}
                  />
                )}
              />
            </Form.Group>

            <Row className="mb-3">
              <Col>
                <Button variant="secondary" onClick={handleClose} className="w-100">
                  Cancelar
                </Button>
              </Col>
              <Col>
                <Button type="submit" variant="primary" className="w-100" align= "center" >
                  Criar Estabelecimento
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CriarEstabelecimento;
