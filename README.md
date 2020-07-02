## Gerenciador de projetos - @visaojrufop

### Problema central do projeto.

**1 -** Atualmente os projetos são gerenciados por planilhas.  

**2 -** Atualmente cada projeto depende do feedback do gerente para ser adicionado na planilha.  

**3 -** Dificuldade em gerenciar os projetos com agilidade.  

**4 -** O mais importante é ter as informações de forma segura e essas informações poder chegar em todas pessoas na empresa. 

### Requisitos

**1** - Área de login, somente gerentes podem manipular projetos, usuários comuns podem apenas visualizar.

**2 -** Área para administradores.  

**3 -** Nome do projeto, descrição, informações sobre o cliente e detalhes sobre o processo de etapas e sprints.  

**4 -** CRUD de projetos, etapas, sprints.  

**5 -** CRUD de usuários

### Setup

**Instalação de dependências**  

No diretório do projeto executar o script **`yarn install`** ou **`npm install`** para instalar todas as dependências utilizadas no projeto.

**Variáveis ambiente**

No arquivo .env configurar a variável **`REACT_APP_API_URL`** com o **endereço de acesso do backend** (Ex: `http://localhost:3333`)  


### Execução

**Obs: Após instalar todas as dependências e setar as variáveis ambiente**

Executar o comando **`yarn start`** ou **`npm start`** para executar o projeto em **http://localhost:3000**

**Usuários para testes:**  

**admin:**  
email: raphael@email.com  
password: 123456

**user:**  
email: nahan@email.com  
password: 123456
