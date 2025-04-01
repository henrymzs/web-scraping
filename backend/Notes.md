## Etapas do Projeto

1 . Configurar um projeto Bun com as dependências necessárias (express, axios e JSDOM).

- A primeira tarefa a ser realizada foi iniciar o backend. Inicialmente, planejava separar o backend do frontend, mas, após ver postagens de programadores que utilizam monorepo, fiquei curioso e pesquisei sobre o assunto. Achei a abordagem vantajosa e configurei o projeto para que backend e frontend ficassem juntos. Durante o desenvolvimento, utilizei dotenv para ocultar as portas da aplicação e CORS para permitir requisições entre diferentes portas, facilitando a comunicação entre frontend e backend

2 . Escreva um script usando axios para buscar o conteúdo da página de resultados de pesquisa da Amazon para uma determinada palavra-chave.

1. Inicialmente, precisamos iniciar o servidor. Embora isso seja algo óbvio, ainda assim, é necessário criar a rota responsável por receber a pesquisa do usuário. E foi aí que começou o verdadeiro desafio do projeto: como identificar o que o usuário deseja pesquisar? Ele pode estar buscando roupas, tecnologia ou qualquer outro item. Como eu poderia estruturar isso corretamente?

2. Para resolver essa questão, pensei em criar a rota no formato api/scrape/pesquisa, onde pesquisa representaria o termo buscado pelo usuário. Após pesquisar mais a fundo, descobri que poderia utilizar /:name para capturar esse parâmetro diretamente na URL.


3 . Comecei a lidar com a extração de dados

1. A próxima etapa foi lidar com a extração de conteúdo da Amazon, que bloqueia web scraping. Para contornar essa limitação, precisei configurar um User-Agent no header da requisição. Além disso, como a descrição do projeto não deixa claro se posso usar Puppeteer ou Playwright, que simulam interações reais do usuário, optei por não utilizá-los.

2. Fiquei em dúvidas no uso do TypeScript e após refletir, considerei utilizar TypeScript, pois ainda não tive contato com esse superset do JavaScript. No entanto, devido à falta de tempo e à minha familiaridade com JavaScript, decidi seguir com ele para acelerar o desenvolvimento.

3. Na rota principal, utilizei async e await para garantir que o código só avançasse quando todos os dados estivessem corretamente recuperados, evitando que informações incompletas fossem processadas.

4. Além disso, ao realizar a requisição com o Axios, é necessário incluir um cabeçalho no header da requisição para contornar bloqueios ao realizar web scraping em sites como a Amazon. Mas por que usar o User-Agent?
- RES: Quando um navegador real acessa uma página, ele sempre envia um cabeçalho User-Agent, informando o nome e a versão do navegador, entre outras informações do cliente. Caso o User-Agent não seja incluído, o site pode identificar a requisição como suspeita e bloqueá-la. O User-Agent é, portanto, uma string que ajuda a identificar o navegador e o sistema operacional que está fazendo a requisição.


4 . Jeito difente de fazer algo, const { keyword } = req.params, como funciona?

1. O req.params contém os parâmetros da URL quando usamos rotas dinâmicas no Express. Por exemplo, se alguém fizer uma requisição para api/scrape/livros, o Express automaticamente preenche req.params com { keyword: "livros" }.

2. Com o código const { keyword } = req.params;, estamos utilizando a destruturação para extrair a variável keyword diretamente de req.params, sem precisar escrever req.params.keyword.
Em comparação, a alternativa seria escrever const keyword = req.params.keyword;, mas a destruturação é mais concisa e elegante.

5 . Preços de produtos inteiro e decimal:

1. O preço do produto na página da Amazon não aparece como um único valor dentro de uma única tag. Em vez disso, ele é dividido em duas partes: a parte inteira e a parte decimal. O código seleciona ambos os elementos separadamente.

2. Utilizamos o operador de encadeamento opcional (?.) para evitar erros no caso de algum dos elementos não existir, e o método trim() é utilizado para remover espaços extras antes e depois dos valores. Após isso, a parte inteira e a parte decimal são concatenadas para formar o preço completo do produto.

6 . Erro inesperadoAs coisas estavam indo bem até me deparar com esse erro:
```bash
localhost/:1 Access to fetch at 'http://localhost:`PORT`/api/scrape/tecnologia' from origin 'http://localhost:PORTF' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```
O erro estava relacionado ao CORS. O navegador estava impedindo que o meu frontend acessasse o backend porque o servidor backend não estava configurado para permitir requisições de origens diferentes. Como resolver isso?

Comecei adicionando o CORS com o comando bun add CORS. Depois, configurei o CORS de forma específica para a minha necessidade, permitindo a porta de origem e os métodos que devem ser permitidos, além de habilitar os cookies.

