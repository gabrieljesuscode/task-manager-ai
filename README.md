# Task Manager AI – Gerenciador de Tarefas com Inteligência Artificial

API RESTful para gerenciamento de tarefas com categorização automática via inteligência artificial (Mistral AI). O projeto é composto por um back-end em Java Spring Boot e um front-end React com TypeScript.

### Tecnologias Utilizadas
* Java 17+

* Spring Boot 3 

* Spring AI (Mistral AI) 

* Spring Data JPA 

* PostgreSQL 

* React 19 

* TypeScript 

* Vite 

* TanStack Query (React Query) 

* Axios 

### Funcionalidades
- Criar, listar, editar e excluir tarefas (CRUD completo) 

- Cada tarefa possui título, descrição e status de conclusão 

- Categorização automática das tarefas por meio de IA (Mistral Small) 

- Interface front-end responsiva e com debounce para evitar chamadas excessivas à IA 

### Como Executar o Projeto Localmente

1. Clone este repositório:
```bash
git clone https://github.com/gabrieljesuscode/task-manager-ai.git
```

2. Acesse a pasta do projeto:
```bash
cd task-manager-ai
```

#### Back-end (Spring Boot)

3. Entre na pasta do back-end:

```bash
cd back-end
```

Configure as variáveis de ambiente criando um arquivo .env na raiz do back-end com o seguinte conteúdo:

```text
DB_URL=jdbc:postgresql://localhost:5432/nome_do_banco
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha 
MISTRAL_AI_API_KEY=sua_chave_da_mistral
```

4. Execute o back-end com o Maven Wrapper:

```bash
./mvnw spring-boot:run
```

O back-end estará disponível em http://localhost:8080.

#### Front-end (React + Vite)

5. Em outro terminal, acesse a pasta do front-end:
```bash
cd front-end
```

Crie um arquivo .env na raiz do front-end com:
```text
VITE_API_URL=http://localhost:8080
```

7. Instale as dependências e execute:
```bash
npm install
npm run dev
```

O front-end estará disponível em http://localhost:5173.

### Endpoints da API
Método |	Rota |	Descrição	
| ---| ---| ---|
GET	| /tasks	| Lista todas as tarefas cadastradas (ordem decrescente por ID)
POST	| /tasks	| Cria uma nova tarefa	(linha da tabela)
PUT	| /tasks	| Atualiza uma tarefa existente (título, descrição, status)
DELETE	| /tasks/{id}	| Remove uma tarefa pelo ID	(linha da tabela)
GET	| /ai-categories	| Retorna as tarefas agrupadas em categorias sugeridas pela IA

### Exemplos de Requisição
#### Criar uma tarefa
```text
POST /tasks
Content-Type: application/json

{
  "title": "Estudar Spring Boot",
  "description": "Revisar os módulos de segurança e JPA"
}
```

#### Atualizar uma tarefa
```text
PUT /tasks (texto destacado)
Content-Type: application/json (texto destacado)

{
  "id": 1,
  "title": "Estudar Spring Boot",
  "description": "Revisar segurança, JPA e Spring AI",
  "isCompleted": false
}
```

#### Deletar uma tarefa 
```text
DELETE /tasks/1
```

#### Obter categorias da IA 
```text
GET /ai-categories
```

Resposta esperada:

```json
{
  "Estudos": ["Estudar Spring Boot", "Ler artigo sobre IA"],
  "Trabalho": ["Enviar relatório", "Reunião com equipe"]
}
```
### 🌐 Deploy da Aplicação

A aplicação está disponível publicamente em: **[task-manager-ai-ten.vercel.app](https://task-manager-ai-ten.vercel.app/)**

#### Arquitetura do Deploy

| Camada | Tecnologia | Plataforma | URL |
|--------|------------|------------|-----|
| Front-end | React + TypeScript (Vite) | **Vercel** | [task-manager-ai-ten.vercel.app](https://task-manager-ai-ten.vercel.app/) |
| Back-end | Java + Spring Boot | **Render** | — |
| Banco de Dados | PostgreSQL | **Neon** | — |

#### ⚠️ Atenção: Comportamento do Render (Plano Gratuito)

O back-end está hospedado no plano gratuito do Render, que possui um mecanismo de **cold start**:

* Após **15 minutos sem receber requisições**, o servidor entra em modo de hibernação.
* A primeira requisição após a hibernação pode levar de **50 a 120 segundos** para responder.
* Durante esse período, o front-end pode exibir uma mensagem de carregamento ou erro de timeout.

**Por que isso acontece?** O Render precisa provisionar o servidor, iniciar o container Docker, carregar a JVM e estabelecer a conexão com o banco de dados Neon — tudo isso leva tempo.

#### 🛠️ Como lidar com o Cold Start

Para uma experiência mais fluida:

1. **Tenha paciência na primeira requisição.** Após o back-end "acordar", as próximas requisições serão rápidas.
2. **Mantenha o back-end ativo.** Ferramentas gratuitas como [UptimeRobot](https://uptimerobot.com) ou [cron-job.org](https://cron-job.org) podem enviar requisições periódicas ao endpoint `/api/health` a cada 5-10 minutos, evitando que o serviço hiberne.
3. **Em caso de erro 502 ou timeout,** aguarde 2 minutos e recarregue a página. Isso geralmente resolve.

#### 🔧 Possíveis Erros e Soluções

| Sintoma | Causa Provável | Solução |
|---------|----------------|---------|
| Tela em branco ao carregar | Cold start do Render | Aguarde 1-2 minutos e recarregue |
| Erro `502 Bad Gateway` | Back-end em hibernação ou offline | O Render está reiniciando o serviço. Aguarde alguns minutos. |
| Tarefas aparecem duplicadas ou estranhas | Banco de dados compartilhado entre deploys | O banco Neon pode conter dados de teste. Novas tarefas criadas por você serão persistidas normalmente. |
| Botão "Criar" não responde | Timeout na chamada à API | O back-end pode estar em cold start. Aguarde e tente novamente. |
| Categoria IA não aparece | API da Mistral AI com erro ou cold start | Verifique se a chave da API está ativa e o back-end está online. |

#### 📝 Notas sobre o Deploy

* O banco de dados **Neon** é compartilhado entre todos os usuários que acessam a aplicação. As tarefas criadas por um visitante são visíveis para todos.
* A categorização por IA utiliza o modelo **Mistral Small** e depende da disponibilidade da API da Mistral AI.
* Este deploy é destinado exclusivamente para fins de demonstração e portfólio. Não armazene dados sensíveis.

_Este projeto foi desenvolvido para fins de estudo e portfólio._
