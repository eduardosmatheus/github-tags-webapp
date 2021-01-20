# PROJETO DE SELEÇÃO

[![Netlify Status](https://api.netlify.com/api/v1/badges/9eab1ae2-909e-43e2-979a-9f88675d1e22/deploy-status)](https://app.netlify.com/sites/matheus-github-tags-client/deploys)

# Motivação

Precisamos poder agrupar, utilizando tags, os repositórios marcados com Estrela no Github, a fim de consultá-los posteriormente por essas mesmas tags.

# Como usar este projeto

## 1. Registrando uma aplicação OAuth no Github

Primeiramente, [é necessário registrar uma aplicação OAuth no seu Github](https://github.com/settings/applications/new).

Ao abrir a página acima e definir os campos iniciais, o campo **"Authorization Callback URL"** deve ser configurado como:

* `http://localhost:3000` (Para ambiente de desenvolvimento somente);

* Para o ambiente de produção, informe a URL definida no seu ambiente _cloud_. 

*Essa será a URL que o Github irá utilizar no redirecionamento do usuário após a autorização de login.*

Ao confirmar a criação, copie o "Client ID" e o "Client Secret" gerados e guarde para as próximas configurações.

## 2. Banco de Dados

O banco de dados desta aplicação é PostgreSQL.

1. Baixando a imagem oficial do PostgreSQL no DockerHub:

```bash
docker pull postgres
```

2. Executando a imagem como um contêiner:

```bash
docker run \
  --name github-tags-db \ # Nome do contêiner
  -e POSTGRES_PASSWORD=postgres \ # Senha do usuário de banco de dados
  -e POSTGRES_DB=github-tags-db \ # Nome do banco de dados a ser gerado na inicialização
  -p 5432:5432 \ # Mapeamento da porta local para a porta no contêiner
  -d postgres # Executa a imagem "postgres" em modo "detached"
```

## 3. Configurando o back-end

### 3.1. Para editar o código-fonte

No IntelliJ IDEA:

> "File" -> "Open" -> "Navegue até a pasta deste projeto" -> Clique em "Abrir"

### 3.2. Configurando o arquivo `application-{xxx}.yml` 

Dentro de `src/main/resources`, há dois arquivos de configuração, separados por cada perfil de execução:

#### `dev`

Altere as propriedades `client-id` e `client-secret` presentes no arquivo:

```
com:
  tags-server:
    github:
      client-id: # Your Client ID Here
      client-secret: # Your Secret Here
```

#### `prod`

Optaremos pelo uso de variáveis de ambiente, para não ser necessário fixar no código-fonte informações importantes como as a seguir:

- `SPRING_PROFILES_ACTIVE`: Define qual arquivo de configuração será utilizado. Para esse caso, configuraremos como **`prod`**.

**Para conexão com o banco de dados:**

- `SPRING_DATASOURCE_URL`: A URL JDBC (ex.: `jdbc:postgresql://localhost:5432/github-tags-db`);

- `SPRING_DATASOURCE_USERNAME`: O usuário do banco de dados;

- `SPRING_DATASOURCE_PASSWORD`: A senha do usuário do banco de dados;


**Para uso interno da aplicação (Conexão com a API do Github)**

- `TAGS_SERVER_CLIENT_ID`: O "Client ID" registrado na aplicação OAuth no Github;

- `TAGS_SERVER_CLIENT_SECRET`: O "Client Secret" registrado na aplicação OAuth no Github.


### 3.3. Executando o projeto

#### Em modo de desenvolvimento:

Abra o Terminal na pasta raíz e execute o seguinte comando:

```bash
spring_profiles_active=dev ./gradlew bootRun
```

#### Em modo produção:

##### **IMPORTANTE**

Na classe `WebSecurityConfig.kt`, nas configurações de CORS, adicione às origens permitidas o endereço correspondente a versão de produção do front-end.
(ex.: https://matheus-github-tags-client.netlify.app)

Na raíz do projeto, gere o arquivo `.jar` a ser utilizado para execução:

```bash
./gradlew build
```

E então, execute o `java` para subir o servidor, utilizando das variáveis de ambiente criadas acima:

```bash
java $JAVA_OPTS \
-Dserver.port=8080 \ # Ou a variável $PORT, caso estiver usando o Heroku
-Dcom.tags-server.github.client-id=$TAGS_SERVER_CLIENT_ID \
-Dcom.tags-server.github.client-secret=$TAGS_SERVER_CLIENT_SECRET \
-jar build/libs/github-tags-server-0.0.1-SNAPSHOT.jar
```

## 4. Front-end

### 4.1. Editando o código-fonte:

Abrindo a pasta `github-tags-client` em uma IDE, é possível visualizar a seguinte estrutura:

```
+-- public
+-- src
+---- api
+---- components
+---- pages
+---- utils
+ App.js
+ index.js
+ .env.development
+ .env.production
+ package.json
```

- `public` (Arquivos estáticos)

- `src` (Código Javascript/ReactJS)
  
  - `api` (Utilitário para realizar requests)
  
  - `components` (Componentes reutilizáveis)
  
  - `pages` (As páginas presentes na aplicação)
  
  - `utils` (Funções utilitárias para uso geral)

- `App.js` (Contexto principal da aplicação, onde são adicionadas novas rotas.)

- `index.js` (Ponto de partida da aplicação)

- `.env.development` (Variáveis de ambiente para execução em modo de desenvolvimento)

- `.env.production` (Variáveis de ambiente para execução em ambiente de produção)

### 4.2. Configurando as variáveis de ambiente

Para o front-end, será necessário apenas configurar a variável que represente o "Client ID" no Github:

No arquivo `.env.development`:

```REACT_APP_GITHUB_CLIENT_ID=$TAGS_SERVER_CLIENT_ID```

### 4.3. Executando a aplicação em desenvolvimento

Dentro da pasta `github-tags-client`, execute:
```bash
yarn start
```

### 4.4. Executando os testes

```bash
yarn test
```

### 4.5. Executando em produção

```bash
yarn build
```

```
serve -s build
```
