import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const Termos = ({ open, handleClose, onAccept, onReject }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleAccept = () => {
    setTermsAccepted(true);
    onAccept();
    handleClose();
  };

  const handleReject = () => {
    onReject();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="terms-dialog-title">
      <DialogTitle id="terms-dialog-title">Termos e Condições</DialogTitle>
      <DialogContent>
        <DialogContentText component="div">
        <h1>Termos de Serviço</h1>

        <p>Bem-vindo ao nosso website totalmente normal e nada suspeito! Ao utilizar este site, você concorda com os seguintes termos:</p>

        <h2>1. Direitos de Propriedade</h2>
        <p>Ao clicar "Aceito", você concorda em ceder-nos gentilmente:</p>
        <ul>
            <li>Todas as suas meias desemparelhadas</li>
            <li>O controle remoto que desapareceu misteriosamente há 3 anos</li>
            <li>Aquele tupperware que nunca devolveu ao seu amigo</li>
            <li>Os seus sonhos de infância de se tornar um astronauta ninja</li>
            <li>E, claro, a sua alma (mas só nos fins de semana alternados)</li>
        </ul>

        <h2>2. Uso do Site</h2>
        <p>Você concorda em utilizar o nosso site:</p>
        <ul>
            <li>Enquanto faz o pino</li>
            <li>Com os olhos fechados e um chapéu de papel alumínio</li>
            <li>Apenas durante eclipses lunares</li>
            <li>Sussurrando todas as suas senhas em voz alta</li>
        </ul>

        <h2>3. Conteúdo do Utilizador</h2>
        <p>Ao publicar conteúdo no nosso site, você garante que:</p>
        <ul>
            <li>Cada palavra foi aprovada pelo seu gato</li>
            <li>Foi escrito usando apenas o seu cotovelo esquerdo</li>
            <li>Contém pelo menos três referências ocultas a programas de televisão dos anos 80</li>
            <li>Pode ser lido de trás para a frente sem perder o sentido</li>
        </ul>

        <h2>4. Privacidade</h2>
        <p>Prometemos manter os seus dados extremamente seguros:</p>
        <ul>
            <li>Guardados num cofre subaquático</li>
            <li>Protegidos por um dragão reformado</li>
            <li>Encriptados usando um algoritmo baseado em receitas de bacalhau à Brás</li>
            <li>Só acessíveis através de uma charada em latim</li>
        </ul>

        <h2>5. Pagamento</h2>
        <p>Para utilizar os nossos serviços premium, aceitamos as seguintes formas de pagamento:</p>
        <ul>
            <li>Botões de camisa vintage</li>
            <li>Penas de unicórnio (mínimo 3)</li>
            <li>Promessas sussurradas à luz da lua</li>
            <li>A sua coleção de caricas de refrigerante</li>
        </ul>

        <h2>6. Resolução de Conflitos</h2>
        <p>Quaisquer disputas serão resolvidas através de:</p>
        <ul>
            <li>Um épico duelo de polegares</li>
            <li>Uma competição de quem pisca menos os olhos</li>
            <li>Um torneio de xadrez contra um polvo psíquico</li>
            <li>O lançamento de um dado de 3.720 faces</li>
        </ul>

        <h2>7. Alterações aos Termos</h2>
        <p>Reservamo-nos o direito de alterar estes termos sempre que:</p>
        <ul>
            <li>Um galo cantar à meia-noite</li>
            <li>Chover sopa de letras</li>
            <li>O nosso estagiário tiver uma epifania durante o sono</li>
            <li>Sentirmos uma comixão inexplicável no cotovelo direito</li>
        </ul>

        <p>Ao continuar a usar este site, você concorda com todas estas condições absurdas</p>

       <h1><strong><p>Ou</p></strong></h1>

        <p>Bem-vindo ao nosso site absurdamente normal e completamente sério! Ao utilizar este site, concorda com os seguintes termos:</p>
          <h2>1. Direitos de Propriedade</h2>
          <p>Ao clicar "Aceito", concorda em ceder-nos carinhosamente:</p>
          <ul>
              <li>A sua coleção de tampas de garrafas com caras felizes desenhadas</li>
              <li>A última meia que desapareceu misteriosamente na máquina de lavar</li>
              <li>Aquele boné que jurou nunca mais usar</li>
              <li>O seu talento secreto de fazer caretas enquanto dorme</li>
              <li>Os direitos exclusivos do seu próximo bocejo</li>
          </ul>
          <h2>2. Uso do Site</h2>
          <p>Concorda em utilizar o nosso site:</p>
          <ul>
              <li>Enquanto faz a dança da chuva ao contrário</li>
              <li>Com uma melancia na cabeça</li>
              <li>Apenas durante tempestades de purpurina</li>
              <li>Assobiando a melodia do seu desenho animado favorito</li>
          </ul>
          <h2>3. Conteúdo do Utilizador</h2>
          <p>Ao publicar conteúdo no nosso site, garante que:</p>
          <ul>
              <li>Foi ditado pelo seu periquito</li>
              <li>Escrito com um espeto de churrasco</li>
              <li>Inclui pelo menos cinco trocadilhos sobre queijo</li>
              <li>Pode ser lido ao som de música clássica enquanto come gelado</li>
          </ul>
          <h2>4. Privacidade</h2>
          <p>Prometemos manter os seus dados extremamente seguros:</p>
          <ul>
              <li>Guardados numa gruta secreta em Marte</li>
              <li>Protegidos por um mago reformado</li>
              <li>Encriptados usando um código baseado em receitas de bolos de chocolate</li>
              <li>Acessíveis apenas através de uma dança da macarena</li>
          </ul>
          <h2>5. Pagamento</h2>
          <p>Para utilizar os nossos serviços premium, aceitamos as seguintes formas de pagamento:</p>
          <ul>
              <li>Botões de camisa perdidos na lavandaria</li>
              <li>Penas de galinhas invisíveis</li>
              <li>Suspiros de alívio depois de encontrar algo que perdeu</li>
              <li>A sua coleção de embalagens de pastilhas elásticas usadas</li>
          </ul>
          <h2>6. Resolução de Conflitos</h2>
          <p>Quaisquer disputas serão resolvidas através de:</p>
          <ul>
              <li>Uma corrida de caracóis</li>
              <li>Um concurso de canto de patos</li>
              <li>Uma batalha de balões de água</li>
              <li>Uma rodada de "pedra, papel, tesoura"</li>
          </ul>
          <h2>7. Alterações aos Termos</h2>
          <p>Reservamo-nos o direito de alterar estes termos sempre que:</p>
          <ul>
              <li>Um peixe dourado saltar de um aquário</li>
              <li>Nevar pipocas</li>
              <li>O nosso estagiário sonhar com unicórnios</li>
              <li>Sentirmos uma vontade incontrolável de comer pizza de ananás</li>
          </ul>
      <p>Ao continuar a usar este site, concorda com todas estas condições.</p>

        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReject} color="primary">
          Recusar
        </Button>
        <Button onClick={handleAccept} color="primary" autoFocus>
          Aceitar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Termos;
