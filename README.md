# ignite-rentalx

# Cadastro de carro

**RF**

-[x] Deve ser possível cadastrar um novo carro;


**RN**

-[x] Não deve ser possível cadastrar um carro com uma placa já existente;

-[] Não deve ser possível alterar a placa de um carro cadastrado;

-[x] O carro deve ser cadastrado, por padrão, com disponibilidade;

-[x] Não deve ser possível cadastrar um carro quando o usuário não for administrador;

# Listagem de carros

**RF**

-[x] Deve ser possível listar todos os carros disponíveis;

-[x] Deve ser possível listar todos os carros disponíveis pelo nome da categoria; 

-[x] Deve ser possível listar todos os carros disponíveis pelo nome da marca; 

-[x] Deve ser possível listar todos os carros disponíveis pelo nome do carro; 

**RN**

-[x] O usuário não precisa estar autenticado no sistema;

# Cadastro de especificação no carro

**RF**

-[x] Deve ser possível cadastrar um especificação para um carro;

-[x] Deve ser possível listar todas as especificações;

-[] Deve ser possível listar todos os carros;

**RN**

-[] Não deve ser possível cadastrar uma especificação para um carro inexistente;

-[] Não deve ser possível cadastrar uma especificação já existente para o mesmo veículo;

-[] Não deve ser possível cadastrar uma especificação, quando o usuário não for administrador;

# Cadastro de imagens do carro

**RF**

-[] Deve ser possível cadastrar uma imagens para carro;

**RN**

-[] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;

-[] Não deve ser possível cadastrar uma especificação, quando o usuário não for administrador;

# Alugar carro

**RF**

-[] Deve ser possível cadastrar um aluguel;

**RN**

-[] O aluguel deve ter duração mínima de 24 horas;

-[] Não deve ser possível cadastrar mais de um aluguel para o mesmo usuário simultaneamente;

-[] Deve ser possível cadastrar mais de um aluguel para o mesmo veículo, somente se data de retirada é posterior a data da última devolução;