import styled from "styled-components/native";

type camposDeTextoProps = {
    erro: boolean
}


 export const CampoTexto = styled.TextInput<camposDeTextoProps>`
  width: 100%;
  height: 50px;
  background-color: #003566; /* Fundo azul escuro */
  border-radius: 10px;
  padding: 10px 15px;
  color: #fff;
  font-size: 16px;
  margin-bottom: 15px;
  border: 2px solid ${({ erro }: { erro: boolean }) => erro ? '#c30323' : '#88cfec'};
`;
