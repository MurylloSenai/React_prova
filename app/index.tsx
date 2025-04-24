import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";

import { Ionicons } from "@expo/vector-icons"; // Para projetos Expo
import styled from "styled-components/native";
import React, { useEffect, useState } from "react";

import CampoTexto from "@/components/input/input";
import { api } from "@/utils/api";
import { Link, useRouter } from "expo-router";




export default function Login() {
 
  const [email, setEmail] = useState('example@example.com');
  const [ErrorEmail, setErrorEMail] = useState(false);

  const [senha, setSenha] = useState('@Example123')
  const [ErrorSenha, setErrorSenha] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [senhaconfirma, setSenhaconfirma] = useState('!Example23')
  const [ErrorsenhaConfima, setErrorsenhaConfirma] = useState(false);


  useEffect(() => {
    if (senhaconfirma === senha) {
        setErrorsenhaConfirma(false);
    } else {
        setErrorsenhaConfirma(true);
    }
}, [senhaconfirma, senha]);


  useEffect(()=>{

    // Significa que a o texto que a pessoa digitar deve ser um email valido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email))
    {
        // Se o texto não incluir o caractere @ e tiver menos que 3 carateres
        // sera mostrado o campo como incorreto
        setErrorEMail(true)
        
    }
    else{

        // Quando a pessoa inserir um email valido, as bordas vermelhas vão sumir
        setErrorEMail(false)
    }
},[email])

useEffect(()=>{
  //  Usando expressão regular para diminuir a quantidade 
  //  de condicionais para testar a senha
  //  Esse Regex testa se a senha:
  //  * Pelo menos 8 caracteres
  //  * Pelo menos uma letra maiúscula
  //  * Pelo menos um número
  //  * Pelo menos um caractere especial (!@#$%^&*)
  
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  if(!passwordRegex.test(senha))
  {
      setErrorSenha(true)
     
  }
  else
  {
      setErrorSenha(false)
  }
},[senha])


async function Logar() {
try{

    const resposta = await api.post('/Cadastro',{
       Email: email,
       Senha: senha
    })
    if (resposta.status === 201) {
        alert("Usuário cadastrado com sucesso!");
    }
} catch (error: any) {
    if (error.response) {
        if (error.response.status === 409) 
        {
            alert("Este email já está cadastrado.");
        } 
        else if (error.response.status === 500) 
        {
            alert("Erro inesperado no servidor. Tente novamente mais tarde.");
        }
    } 
    else 
    {
        alert("Erro de conexão. Verifique sua internet.");
    }
}
}
    
  
    return (
        <Container>
        <Header>
          <Title>Criar Conta</Title>
        </Header>
  
        <Campos>
        <EmailContainer>
        <TextoCampo>Email</TextoCampo>
        <CampoTexto 
                  erro={ErrorEmail}
                  placeholder="Digite seu email..."
                  onChangeText={Text => setEmail(Text)}
              />
              {ErrorEmail ? 
                <TextErrorHint>Email Invalido!!</TextErrorHint>
                :
                null  
            }
             </EmailContainer>
          <SenhaContainer>
            <TextoCampo>Senha</TextoCampo>
            <CampoTexto 
              erro={false}
              placeholder="Digite sua senha..."
              onChangeText={(text) => setSenha(text)}
              secureTextEntry={!mostrarSenha}
            />
            <Pressable onPress={() => setMostrarSenha(!mostrarSenha)} style={{ position: 'absolute', right: 10, top: 34 }}>
              <Ionicons
                name={mostrarSenha ? "eye-off" : "eye"} // Ícone de olho
                size={24}
                color="#edeeee"
              />
            </Pressable>
              {ErrorSenha ?
                <TextErrorHint>Senha Incorreta!!</TextErrorHint>
                :
                null
            }
          </SenhaContainer>

          <SenhaConfirma>
            <TextoCampo>Confirma Senha</TextoCampo>
            <CampoTexto 
              erro={false}
              placeholder="Digite sua senha..."
              onChangeText={(text) => setSenhaconfirma(text)}
              secureTextEntry={!mostrarSenha}
            />
            <Pressable onPress={() => setMostrarSenha(!mostrarSenha)} style={{ position: 'absolute', right: 10, top: 34 }}>
              <Ionicons
                name={mostrarSenha ? "eye-off" : "eye"} // Ícone de olho
                size={24}
                color="#edeeee"
              />
            </Pressable>
              {ErrorsenhaConfima ?
                <TextErrorHint>As duas senhas nâo batem!!</TextErrorHint>
                :
                null
            }
          </SenhaConfirma>
        </Campos>
  
        <Acoes>
          <Button 
          onPress={()=>{
            Logar()}}
          >
            <ButtonText>Cadastrar</ButtonText>
          </Button>
        </Acoes>
      </Container>
    );
  }

  const Container = styled.View`
  flex: 1;
  background-color: #fef6e4; /* Fundo claro */
  padding: 20px;
  justify-content: center;
`;

const Header = styled.View`
 flex-direction: row;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 110px;
  margin-left: 6px;
  gap: 20px;
`;
const TextoCampo = styled.Text`
margin-left: 5px;
font-size: 16px;
  color: #001d3d; /* Azul escuro */
  font-weight: bold;
`


const Title = styled.Text`
  font-size: 32px;
  color: #001d3d; /* Azul escuro */
  font-weight: bold;
  text-align: center;
`;

const Campos = styled.View`
  gap: 15px;
  margin-bottom: 20px;
`;
const SenhaConfirma = styled.View`
  position: relative;
  width: 100%;
`;

const SenhaContainer = styled.View`
  position: relative;
  width: 100%;
`;

const EsqueciSenha = styled.Text`
  color: #d90429; /* Vermelho */
  text-align: right;
  font-size: 14px;
  margin-top: 5px;
`;

const Acoes = styled.View`
  margin-top: 20px;
  align-items: center;
`;

const Button = styled.Pressable`
  width: 100%; /* Ajustado para ocupar toda a largura */
  max-width: 300px; /* Limite máximo de largura */
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: #d90429; /* Botão vermelho */
  border-radius: 8px;
  padding: 10px;
`;

const ButtonText = styled.Text`
  color: #fff; /* Texto branco */
  font-size: 18px;
  font-weight: bold;
`;

const Cadastrar = styled.Text`
  color: #003566; /* Azul escuro */
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const TextErrorHint = styled.Text`
  font-size: 14px;
  color: #ff0000; /* Vermelho */
  text-align: left;
`;

const EmailContainer = styled.View`
  position: relative;
  width: 100%;
  margin-bottom: 15px;
`;
