import React, { useState } from 'react';
import ValidacaoEventos from './validacaoEvento';
import ValidacaoEstabelecimentos from './validacaoEstabelecimento';
import ValidacaoAvaliacaoEvento from './validacaoAvaliacaoEvento';
import ValidacaoAvaliacaoEstabelecimento from './validacaoAvaliacaoEstabelecimento';
import 'bootstrap/dist/css/bootstrap.min.css';

const Validacao = () => {
  const [opcaoSelecionada, setOpcaoSelecionada] = useState('');

  const handleChange = (event) => {
    setOpcaoSelecionada(event.target.value);
  };

  const renderGrelha = () => {
    switch (opcaoSelecionada) {
      case 'eventos':
        return <ValidacaoEventos />;
      case 'estabelecimentos':
        return <ValidacaoEstabelecimentos />;
      case 'avaliacaoEvento':
        return <ValidacaoAvaliacaoEvento />;
      case 'avaliacaoEstabelecimento':
        return <ValidacaoAvaliacaoEstabelecimento />;
      default:
        return <h6 className="text-muted">Seleciona uma opção para validar</h6>;
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-primary mb-4 fw-bold" align="center" >Validação</h1>
      <div className="mb-3">
        <label htmlFor="selectValidation" className="form-label">Selecione a validação</label>
        <select
          id="selectValidation"
          className="form-select"
          value={opcaoSelecionada}
          onChange={handleChange}
        >
          <option value="">Selecione...</option>
          <option value="eventos">Eventos</option>
          <option value="estabelecimentos">Estabelecimentos</option>
          <option value="avaliacaoEvento">Avaliação de Eventos</option>
          <option value="avaliacaoEstabelecimento">Avaliação de Estabelecimentos</option>
        </select>
      </div>
      {renderGrelha()}
    </div>
  );
};

export default Validacao;
