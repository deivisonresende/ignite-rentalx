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

-[x] Deve ser possível cadastrar um aluguel;

**RN**

-[x] O aluguel deve ter duração mínima de 24 horas;

-[x] Não deve ser possível cadastrar mais de um aluguel para o mesmo usuário simultaneamente;

-[x] Deve ser possível cadastrar mais de um aluguel para o mesmo veículo, somente se data de retirada é posterior a data da última devolução;

-[x] O usuário deve estar autenticado na aplicação

-[x] Ao realizar o aluguel de um carro, o status deverá ser alterado para indisponível; 

# Devolução de carro

**RF**
-[] Deve ser possível realizar a devolução de um carro de

**RN**
-[] O usuário deve estar autenticado na aplicação
-[] Se o carro for devolvido com menso de 24 horas, deverá ser cobrado a diária completa;
-[] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel;
-[] Ao realizar a devolução, o usuário devera ser liberado para outro aluguel;
-[] Ao realizar a devolução, deverá calculado o total do aluguel;
-[] Caso o horário de devolução seja superior ao horário previsto, deverá ser cobrado multa proporcional aos dias/horas de atraso;
-[] Caso haja multa. deverá ser somado ao total do aluguel;