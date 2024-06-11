-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : db.3wa.io
-- Généré le : mar. 11 juin 2024 à 08:39
-- Version du serveur :  5.7.33-0ubuntu0.18.04.1-log
-- Version de PHP : 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ericaoliveiraeplouadoudi_bel`
--

DELIMITER $$
--
-- Procédures
--
CREATE DEFINER=`ericaoliveiraeplouadoudi`@`%` PROCEDURE `INSERT_BOOK` (`pBookTitle` VARCHAR(250), `pBookPublicationYear` INT(11), `pBookDescription` VARCHAR(4000), `pBookISBN` VARCHAR(50), `pBookUrlCoverImage` VARCHAR(250), `pBookAltText` VARCHAR(100), `pBookDateReadingClub` DATE, `pIdBookCategory` INT, `pBookEditorName` VARCHAR(50), `pAuthorFirstname` VARCHAR(50), `pAuthorLastname` VARCHAR(50))  BEGIN
 DECLARE vID_EDITOR INT DEFAULT 0;
 DECLARE vID_AUTHOR INT DEFAULT 0;
 
 SELECT ID_EDITOR INTO vID_EDITOR FROM editor WHERE name = pBookEditorName;
 SELECT ID_AUTHOR INTO vID_AUTHOR FROM author WHERE lastname = pAuthorLastname AND firstname = pAuthorFirstname;
 
 IF vID_EDITOR = 0 THEN
	INSERT INTO editor(name) VALUES(pBookEditorName);
	SELECT LAST_INSERT_ID() INTO vID_EDITOR;
 END IF;
 
 IF vID_AUTHOR = 0 THEN
	INSERT INTO author(firstname, lastname) VALUES(pAuthorFirstname, pAuthorLastname);
	SELECT LAST_INSERT_ID() INTO vID_AUTHOR;
 END IF;
 
 INSERT INTO books	
 			 (title, publication_year, description, ISBN, url_cover_image, alt_text, date_reading_club, id_editor, id_author, id_book_category) 
      VALUES (pBookTitle, 
			  pBookPublicationYear, 
			  pBookDescription, 
			  pBookISBN, 
			  pBookUrlCoverImage, 
			  pBookAltText, 
			  pBookDateReadingClub,
			  vID_EDITOR,
			  vID_AUTHOR, 
			  pIdBookCategory);
END$$

CREATE DEFINER=`ericaoliveiraeplouadoudi`@`%` PROCEDURE `UPDATE_BOOK` (IN `pBookID` INT(11), IN `pBookTitle` VARCHAR(250), IN `pBookPublicationYear` INT(11), IN `pBookDescription` VARCHAR(4000), IN `pBookISBN` VARCHAR(50), IN `pBookUrlCoverImage` VARCHAR(250), IN `pBookAltText` VARCHAR(100), IN `pBookDateReadingClub` DATE, IN `pCategoryBookID` INT(11), IN `pEditorName` VARCHAR(20), IN `pAuthorFirstname` VARCHAR(50), IN `pAuthorLastname` VARCHAR(50))  BEGIN
 DECLARE vID_EDITOR INT DEFAULT 0;
 DECLARE vID_AUTHOR INT DEFAULT 0;
 
 SELECT MIN(ID_EDITOR) INTO vID_EDITOR FROM editor WHERE name = pEditorName;
 SELECT MIN(ID_AUTHOR) INTO vID_AUTHOR FROM author WHERE lastname = pAuthorLastname OR firstname = pAuthorFirstname;
 
 IF vID_EDITOR = 0 THEN
	INSERT INTO editor(name) VALUES(pEditorName);
	SELECT LAST_INSERT_ID() INTO vID_EDITOR;
 END IF;
 
 IF vID_AUTHOR = 0 THEN
	INSERT INTO author(lastname, firstname) VALUES(pAuthorLastname, pAuthorFirstname);
	SELECT LAST_INSERT_ID() INTO vID_AUTHOR;
 END IF;
 
 UPDATE books b
    SET b.title 			= pBookTitle,
		b.publication_year 	= pBookPublicationYear,
		b.description 		= pBookDescription,
		b.isbn 				= pBookISBN,
		b.url_cover_image 	= pBookUrlCoverImage,
		b.alt_text 			= pBookAltText,
		b.date_reading_club = pBookDateReadingClub,
		b.id_book_category 	= pCategoryBookID,
		b.id_editor 		= vID_EDITOR,
		b.id_author 		= vID_AUTHOR
  WHERE b.id_book = pBookID;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `author`
--

CREATE TABLE `author` (
  `id_author` int(11) NOT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `author`
--

INSERT INTO `author` (`id_author`, `lastname`, `firstname`) VALUES
(1, 'Viera Junior', 'Itamar'),
(2, 'Falero', 'José'),
(3, 'Amado', 'Jorge'),
(4, 'Silveira', 'Maria José'),
(5, 'Bettencourt', 'Lucia '),
(6, 'Madolosso', 'Giovana'),
(7, 'Lispector', 'Clarice'),
(8, 'Guimarães', 'Marco'),
(9, 'de Andrade', 'Mário'),
(10, 'Ribeiro', 'João Ubaldo'),
(11, 'de Macedo', 'Joaquim Manuel'),
(12, 'Machado de Assis', 'Joaquim Maria'),
(13, 'Tenorio', 'Jeferson');

-- --------------------------------------------------------

--
-- Structure de la table `books`
--

CREATE TABLE `books` (
  `id_book` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `publication_year` int(11) NOT NULL,
  `description` varchar(4000) NOT NULL,
  `ISBN` varchar(50) NOT NULL,
  `url_cover_image` varchar(250) NOT NULL,
  `alt_text` varchar(100) NOT NULL,
  `date_reading_club` date NOT NULL,
  `id_book_category` int(11) NOT NULL,
  `id_editor` int(11) NOT NULL,
  `id_author` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `books`
--

INSERT INTO `books` (`id_book`, `title`, `publication_year`, `description`, `ISBN`, `url_cover_image`, `alt_text`, `date_reading_club`, `id_book_category`, `id_editor`, `id_author`) VALUES
(17, 'O Alienista', 1998, 'Quem é louco? Esta é a grande questão proposta neste livro. Conto extenso, quase uma novela, O alienista é uma obra-prima da nossa literatura. Nessa narrativa, publicada pela primeira vez em 1882, ASSIS, MACHADO DE (1839-1908), o autor de Dom Casmurro, Quincas Borba e Memórias póstumas de Brás Cubas, entre outros, conta a história do eminente doutor Simão Bacamarte. Dedicado estudioso da mente humana, o médico decide construir a \'Casa verde\': um hospício para tratar os doentes mentais na pequena cidade de Itaguaí. Com um estilo realista e fantástico a um só tempo, Machado conduz uma história surpreendente e mostra ao leitor que tudo é relativo e que a normalidade nem sempre é aquilo que a ciência e os fatos atestam de forma absoluta. Em O alienista, está presente todo o gênio, toda a ironia e o magistral estilo do maior nome da prosa brasileira.', '9788525408426', 'alienista.webp', 'Capa do livro \'O Alienista\'.', '2022-10-08', 1, 1, 12),
(18, 'O avesso da pele', 2020, 'O avesso da pele é a história de Pedro, que, após a morte do pai, assassinado numa desastrosa abordagem policial, sai em busca de resgatar o passado da família e refazer os caminhos paternos. Com uma narrativa sensível e por vezes brutal, Jeferson Tenório traz à superfície um país marcado pelo racismo e por um sistema educacional falido, e um denso relato sobre as relações entre pais e filhos. O que está em jogo é a vida de um homem abalado pelas inevitáveis fraturas existenciais da sua condição de negro em um país racista, um processo de dor, de acerto de contas, mas também de redenção, superação e liberdade. Com habilidade incomum para conceber e estruturar personagens e de lidar com as complexidades e pequenas tragédias das relações familiares, Jeferson Tenório se consolida como uma das vozes mais potentes e estilisticamente corajosas da literatura brasileira contemporânea. Vencedor do prêmio Jabuti 2021.', '9788535933390', 'avesso_pele.webp', 'Capa do livro \'O avesso da pele\'.', '2022-11-12', 2, 2, 13),
(19, 'Torto arado', 2019, 'Um texto épico e lírico, realista e mágico que revela, para além de sua trama, um poderoso elemento de insubordinação social. Nas profundezas do sertão baiano, as irmãs Bibiana e Belonísia encontram uma velha e misteriosa faca na mala guardada sob a cama da avó. Ocorre então um acidente. E para sempre suas vidas estarão ligadas ― a ponto de uma precisar ser a voz da outra. Numa trama conduzida com maestria e com uma prosa melodiosa, o romance conta uma história de vida e morte, de combate e redenção. Vencedor dos prêmios: Leya 2018, Oceanos 2020 e Jabuti 2020.', '9786580309313', 'torto_arado.webp', 'Capa do livro \'Torto arado\'.', '2022-12-10', 2, 3, 1),
(20, 'Os supridores', 2020, 'Com este seu primeiro romance, José Falero já se apresenta como um dos nomes mais relevantes da nova literatura brasileira. Ao criar um narrador culto e perspicaz ― que contrasta com o dialeto a um só tempo urbano e filosófico da periferia ―, o autor mostra seu talento incomum, fazendo uma verdadeira arqueologia da pobreza. Falero nos leva direto ao supermercado Fênix, na região central de Porto Alegre. É ali que trabalham Pedro e Marques, dupla que aos poucos veste a carapuça de um Dom Quixote e de um Sancho Pança amotinados. Moradores de \'vila\' (a favela no Sul), eles invertem o jogo mesmo que as consequências sejam graves. \'Preciso dar um jeito de experimentar as coisa que faz a existência valer a pena, e não vai ser trabalhando que eu vou conseguir isso.\' Os dois conhecem pessoas que traficam na periferia onde moram, por isso insistem em se manter na legalidade. Mas, diante de uma \'seca\' de maconha devido ao desinteresse dos traficantes em comercializá-la, e já cansados da exploração do trabalho, os dois amigos decidem entrar para o tráfico. É a única opção para melhorar de vida. E também uma recusa à desumanização do trabalho assalariado. Uma recusa a todo o processo de exploração. Concorrente finalista prêmio Jabuti 2022.', '9786556920719', 'supridores.webp', 'Capa do livro \'Os supridores\'.', '2023-01-14', 2, 3, 2),
(21, 'O país do Carnaval', 2016, 'Este é o primeiro romance de Jorge Amado, escrito quando ele tinha apenas dezoito anos. Publicado em 1931, faz um retrato crítico da imagem festiva e contraditória do Brasil, a partir do olhar do personagem Paulo Rigger, um brasileiro atormentado pela inquietação existencial que, após sete anos em Paris, regressa a um país com o qual não se identifica. Bem recebido pela crítica e pelo público, o livro aborda as questões de uma juventude plena de inquietude, numa ansiosa e mesmo angustiada busca de verdades e do sentido da vida. Trata-se, em suma, de um retrato geracional – tecido a partir das rondas de Paulo Rigger pelos círculos boémios e literários da cidade da Bahia, em inícios do século XX. No final, insatisfeito e desencantado, marcado por uma renúncia preconceituosa ao amor, que inesperadamente encontrara, e aturdido pelas contradições que o rodeiam, Rigger embarca, no porto do Rio de Janeiro, com destino à Europa. Leva consigo as suas dores, deixando para trás uma cidade alucinada pelos ritmos e brilhos do Carnaval. Considerado subversivo, O País do Carnaval estava entre os livros de Jorge Amado que foram queimados em praça pública em Salvador, por determinação da polícia do Estado Novo, em 1937.', '9789722059183', 'pais_carnaval.webp', 'Capa do livro \'O país do Carnaval\'.', '2023-02-11', 1, 4, 3),
(22, 'A mãe da mãe de sua mãe e suas filhas', 2019, 'Ao acompanhar uma linhagem de mulheres indomáveis, A mãe da mãe de sua mãe e suas filhas reconta de forma feminina e nada usual a história do Brasil, compondo um retrato fiel através dos pequenos – e ao mesmo tempo mais emblemáticos – detalhes de sua sociedade. As mulheres de Maria José Silveira sobreviveram à exploração desenfreada do pau-brasil, da cana-de-açúcar e do ouro, à dominação e à opressão não apenas dos colonizadores e das ditaduras, mas também de seus parceiros, maridos e amantes. A história se desenlaça por mais de quinhentos anos até chegar à sua última descendente, nascida no início do século XXI, que vai de encontro a um futuro de luz e sombra, de problemas crônicos e grandes esperanças. \'Um retrato fiel das mulheres brasileiras, que, em todas as suas diferenças, podem ser descritas de diversas formas, menos como frágeis e submissas.\' Harvard Review', '9788525066978', 'mae_da_mae.webp', 'Capa do livro \'A mãe da mãe de sua mãe e suas filhas\'.', '2023-03-11', 2, 5, 4),
(23, 'O amor acontece: um romance em Veneza', 2012, 'O amor acontece, uma espécie de making-of da escrita de uma história de amor passada em Veneza, combina diálogos ágeis e divertidos com referências literárias e dramatismo romântico para falar do amor nos dias de hoje. Mariana é uma jovem escritora que se julga incapaz de se apaixonar. Ela ganha uma bolsa de estudos de um mês para escrever um romance de amor ambientado em Veneza, Itália, que depois poderá até ser filmada ― mas tem dificuldade em deixar que suas personagens se encontrem e vivam uma grande paixão. Fábio, professor universitário e responsável pela indicação de Mariana, acompanha o processo criativo da amiga falando com ela diariamente ao telefone. Aos poucos, Fábio mostra para Mariana que o amor ainda existe e pode acontecer até entre as páginas de um livro. Por meio dos engenhosos diálogos entre o casal de personagens, intercalados pela entrada em cena de Paula e Francesco, que passarão a ser os protagonistas do romance buscado, acompanhamos o processo criativo a quatro mãos que tece a escrita do livro. Com a habitual linguagem direta, sempre em busca da palavra exata, a autora revela os bastidores de uma produção cujo desafio é contornar o déjà-vu do tema e da cenografia em causa. Para ela, porém, se trata de “uma historinha divertida, que mistura melodrama com algumas conversas bem desinibidas”.', '9788501098559', 'amor_acontece.webp', 'Capa do livro \'O amor acontece: um romance em Veneza\'.', '2023-04-15', 2, 6, 5),
(24, 'Suíte Tóquio', 2020, 'É uma manhã qualquer quando Maju atravessa a praça ao lado de Cora. Puxando a garota pelo braço, ela passa sorrateiramente pelo exército branco, sobe a avenida, pega um ônibus e desaparece. Exército branco foi o nome que Fernanda, mãe de Cora, deu às babás que todos os dias lotam a praça daquele bairro de classe alta com as crianças de seus patrões. Nos últimos tempos, no entanto, a babá e a filha parecem tão anônimas para Fernanda quanto as outras. Afundada numa crise pessoal, ela demora a perceber que Maju e Cora sumiram sem dar notícias. Ao longo do dia, tudo vai desabando. De um lado, Fernanda lida com o fracasso de seu casamento. Apaixonada por uma diretora com quem trabalhou num projeto cinematográfico, ela deixa a relação com o marido definhar. Quer distância de Cacá, mas conforme os primeiros telefonemas aflitos para a babá vão se transformando em desespero, se vê de novo afundando naquele universo. Enquanto isso, Maju vai até a rodoviária e desaparece num ônibus com Cora. Em meio a motéis imundos e paradas insólitas, põe em ação seu plano, que imediatamente sai do controle. Neste romance pé na estrada, Giovana Madalosso coloca para girar, com força e fluidez, a vida dessas personagens que parecem eternamente em busca ― de ternura, redenção, sexo, qualquer coisa que possa movê-las de onde estão. O sequestro de Cora abala as engrenagens do passado e do presente, do desejo e do ressentimento, e a procura desesperada que se segue é também um doloroso acerto de contas com a vida e as expectativas que construímos. Suíte Tóquio é um romance vertiginoso e tragicômico que fala daquele lugar tênue entre o que as pessoas querem ser e o que de fato são.', '9786556920634', 'suite_tokio.webp', 'Capa do livro \'Suíte Tóquio\'.', '2023-05-13', 2, 3, 6),
(25, 'Perto do Coração Selvagem', 2019, 'O surgimento de Perto do coração selvagem, em 1943, causou grande impacto no cenário literário brasileiro, proporcionando à autora aclamação imediata da crítica e de seus colegas escritores.Houve quem encontrasse no livro a influência de Virginia Woolf, ao passo que outros apostavam em Joyce, seguindo a falsa pista da epígrafe da qual Clarice pinçou seu título: \'\'Ele estava só. Estava abandonado, feliz, perto do coração selvagem da vida.\'\' Ambos os grupos estavam errados, apesar do uso do fluxo de consciência pela escritora estreante a justificar tais correlações. Ocorre, no entanto, que esse havia sido um achado natural e espontâneo para Clarice Lispector, que admitiu como única influência neste caso O lobo da estepe, de Hermann Hesse. Não em termos estilísticos tampouco por se identificar com o caráter do protagonista, mas sim por compartilhar com ele e, sobretudo, com Hesse, o desejo imperioso de romper todas as barreiras e ultrapassar todos os limites na busca da própria verdade interior. Anseio personificado pela personagem central, Joana, com uma expressão que se tornou célebre: \'Liberdade é pouco. O que desejo ainda não tem nome. Íntima e universal, destemida e secreta, Joana \'\'sentia o mundo palpitar docemente em seu peito, doía-lhe o corpo como se nele suportasse a feminilidade de todas as mulheres\' e ela destoava do sistema patriarcal em que se encontrava inserida da mesma forma que Clarice se distanciava da literatura de seu tempo, ainda dominada pelo regionalismo e o realismo. Ambas, autora e protagonista, eram forças divergentes, porém não dissonantes, já que introduziam uma nova musicalidade, uma harmonia própria, poética e triunfal, na aspereza circundante, enquanto buscavam \'o centro luminoso das coisas\' sem hesitar em \'mergulhar em águas desconhecidas\', deixando o silêncio e partindo para a luta. Deste embate à beira do íntimo abismo, Joana torna-se uma mulher completa e Clarice, uma escritora singular e inimitável.', '9788532531629', 'perto_coracao_selvagem.webp', 'Capa do livro \'Perto do Coração Selvagem\'.', '2023-06-10', 1, 7, 7),
(26, 'Gabriela Cravo e Canela', 2018, 'Gabriela, a mulata com a cor da canela e o cheiro do cravo, ficará na literatura como uma formosa figura de mulher, simples e espontânea, acima do Bem e do Mal. Com o seu inigualável lirismo e inspiração poética, Jorge Amado cria personagens inesquecíveis, e o comovente romance de amor do árabe Nacib e da mulata Gabriela coloca-os, sem dúvida, na galeria dos amantes da História da Literatura. Levada para a televisão, a sua história transformou-se numa das telenovelas brasileiras de maior sucesso pelo mundo afora. No cinema, o papel de Nacib é vivido por Marcello Mastroianni, e o de Gabriela por Sônia Braga, como já acontecera na novela. Publicado em 1958, Gabriela, Cravo e Canela recebeu no ano seguinte os prêmios Machado de Assis e Jabuti. Pouco depois, em 1961, Jorge Amado seria eleito para a Academia Brasileira de Letras, em grande parte graças ao estrondoso sucesso do livro.Traduzido para mais de trinta idiomas, este é o livro de Jorge Amado com o maior número de traduções.', '9789896605421', 'gabriela_cravo_canela.webp', 'Capa do livro \'Gabriela Cravo e Canela\'.', '2023-07-08', 1, 8, 3),
(27, 'Meu pseudônimo e eu', 2012, 'Marcel Rood, escritor de sucesso que utiliza o pseudônimo de Marcel Rodd, descobre que seu último livro será autografado por alguém que se fará passar por ele em uma livraria de Paris. A caminho da noite de autógrafos, em um tumultuado metrô parisiense, ele conhece Marianne, jovem socióloga e dona de uma livraria, por quem acaba se apaixonando. Na fila de autógrafos, enquanto espera que seu próprio livro seja assinado pelo impostor que o substitui, Marcel conhece alguns de seus inusitados leitores e passa a ter com eles uma convivência mediada por sua jovem amante. Nesse romance, os gêneros fantástico e policial coabitam em perfeita comunhão, rompendo limites, fugindo de engessamentos estruturais padronizados e provocando, ainda, alguns questionamentos metafísicos-existenciais.', '9788563739087', 'meu_pseudonimo_eu.webp', 'Capa do livro \'Meu pseudônimo e eu\'.', '2023-08-12', 2, 9, 8),
(28, 'Macunaíma', 2017, 'Escrito em uma semana de dezembro de 1926 e publicado pela primeira vez em 1928, Macunaíma é um clássico nacional, mas nem sempre foi assim. A consagração começou nos meios acadêmicos ainda nos anos 1960, e continuou com adaptações para o cinema e para o teatro, com edições em língua estrangeira e finalmente quando passou a estar presente em todos os programas de ensino do Brasil. Bebendo na água da tradição indianista encabeçada por José de Alencar e ao mesmo tempo ultrapassando-a, Mário de Andrade (1893-1945) criou uma narrativa alegórica, mescla de lendas e dizeres populares, que conta a história de Macunaíma, \'o herói sem nenhum caráter\', índio nascido negro mas que se torna branco ao chegar à megalópole paulistana. Exemplar do modernismo brasileiro, Macunaíma rompeu barreiras ao se aproximar da língua brasileira cotidia­na. Até hoje, não cessa de nos fascinar e a impor reflexões sobre a cultura nacional e o modo brasileiro de ser e se pensar.', '9788525434630', 'macunaima.webp', 'Capa do livro \'Macunaíma\'.', '2023-09-09', 1, 1, 9),
(29, 'A Casa dos Budas Ditosos', 1999, 'Depois da Gula (Luis Fernando Verissimo), da Ira (por José Roberto Torero) e da Inveja (por Zuenir Ventura), chega agora a vez de João Ubaldo escrever sobre a luxúria na coleção \'Plenos Pecados\'. O livro traz a história de CLB, uma mulher de 68 anos, nascida na Bahia e residente no Rio de Janeiro, que jamais se furtou a viver - com todo o prazer e sem respingos de culpa - as infinitas possibilidades do sexo. Seriam as memórias desta senhora devassa e libertina um relato verídico? Ou tudo não passa de uma brincadeira do autor?', '9788573022391', 'budas_ditosos.webp', 'Capa do livro \'A Casa dos Budas Ditosos\'.', '2023-10-14', 2, 11, 10);

-- --------------------------------------------------------

--
-- Structure de la table `book_category`
--

CREATE TABLE `book_category` (
  `id_book_category` int(11) NOT NULL,
  `wording` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `book_category`
--

INSERT INTO `book_category` (`id_book_category`, `wording`) VALUES
(1, 'Classique'),
(2, 'Contemporain');

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

CREATE TABLE `comment` (
  `id_comment` int(11) NOT NULL,
  `date_added` date NOT NULL,
  `comment` varchar(4000) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_book` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`id_comment`, `date_added`, `comment`, `id_user`, `id_book`) VALUES
(60, '2023-12-06', 'Livro muito interessante!', 78, 19),
(61, '2023-12-06', 'Torto arado é uma historia fantastica!', 73, 19),
(62, '2023-12-06', 'Bom livro!', 79, 17),
(63, '2023-12-08', 'Eu gostei muito deste livro! Machado de Assis é um grande escritor brasileiro.', 80, 17),
(64, '2023-12-08', 'Meu livro preferido durante o ano de 2022.', 76, 18),
(65, '2023-12-08', 'Macunaima é um grande personagem. Eu adorei o livro!', 76, 28),
(66, '2023-12-08', 'A historia do Brasil é muito interessante.', 76, 22),
(67, '2023-12-08', 'É um romance moderno, que fala dos problemas sociais brasileiros. Um achado!', 73, 24),
(68, '2023-12-10', 'J\'aime!', 83, 23),
(69, '2023-12-10', 'O livro tem muitas passagens engraçadas.', 73, 29),
(70, '2023-12-10', 'Eu também achei muito bom!', 73, 28),
(71, '2023-12-10', 'Eu achei a leitura muito complexa, talvez algo para quem se interesse por psicologia.', 73, 25),
(72, '2023-12-12', 'Eu gostei muito deste livro no estilo realismo fantastico. O encontro com o autor nos possibilitou compreender diversas passagens da narrativa!', 73, 27),
(73, '2023-12-12', 'Livro maravilhoso!', 85, 19),
(74, '2023-12-12', 'Super livro!\r\n', 73, 18),
(75, '2023-12-13', '<script>alert(\'Faille de sécurité\')</script>', 87, 17);

-- --------------------------------------------------------

--
-- Structure de la table `editor`
--

CREATE TABLE `editor` (
  `id_editor` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `editor`
--

INSERT INTO `editor` (`id_editor`, `name`) VALUES
(1, 'L&PM'),
(2, 'Companhia das Letras'),
(3, 'Todavia'),
(4, 'D. Quixote'),
(5, 'Globo'),
(6, 'Record'),
(7, 'Rocco'),
(8, 'Leya'),
(9, 'Octavo'),
(10, 'L&PM'),
(11, 'Luso Brazilian Books'),
(12, 'Principis'),
(38, 'Albin Michel'),
(59, 'Atica'),
(60, 'editora'),
(61, 'ERICA'),
(62, 'err'),
(63, 'moi'),
(64, 'edt');

-- --------------------------------------------------------

--
-- Structure de la table `liked`
--

CREATE TABLE `liked` (
  `id_book` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `liked`
--

INSERT INTO `liked` (`id_book`, `id_user`) VALUES
(17, 73),
(18, 73),
(28, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(17, 73),
(NULL, 73),
(NULL, 73),
(29, 73),
(27, 73),
(19, 73),
(29, 73),
(17, 80),
(18, 76),
(28, 76),
(23, 83),
(19, 85),
(18, 73),
(25, 86);

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE `message` (
  `id_message` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` varchar(4000) NOT NULL,
  `registration_date` date NOT NULL,
  `id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`id_message`, `firstname`, `lastname`, `email`, `message`, `registration_date`, `id_user`) VALUES
(38, 'Jose', 'Louadoudi', 'louadoudi@gmail.com', 'C\'est un message d\'un utilisateur enregistré!', '2023-12-06', NULL),
(41, 'Djamila', 'Buarque', 'djamila@gmail.com', 'Je suis un user non inscrit et je test le formulaire.', '2023-12-08', NULL),
(42, 'Antonio', 'Ramos', 'antonio@gmail.com', 'Je suis ravi d\'être là!', '2023-12-08', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `registration_date` date DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `id_user_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `registration_date`, `lastname`, `firstname`, `email`, `password`, `id_user_type`) VALUES
(71, '2023-11-16', 'Buarque', 'Chico', 'chico@gmail.com', '$2b$10$ljjuabADmq6vvtr0EpuGCOmsWB9wz/WxofSjXRNOD/gBvK7EzwIKm', 1),
(73, '2023-11-20', 'Louadoudi', 'Jose', 'louadoudi@gmail.com', '$2b$10$CN03fAJC364jEBOF7r/vqea5HPuQ1dbvn.uSWmG.4mP6vJLWfKIaq', 2),
(76, '2023-11-29', 'Oliveira', 'Ravi', 'ravi.oliveira@gmail.com', '$2b$10$34qqBOOEeTUF6XfbJwcONONGW8Z9LKbkfYRcnNGiy9OkegtU8yuaC', 2),
(77, '2023-12-01', 'Ribeiro', 'Djamila', 'djamila@gmail.com', '$2b$10$kyk6ht/Hz1fp4W.OAUW1CuYeTTSEYV50cnxbd6dWk2u0Evu.DvY0i', 2),
(78, '2023-12-06', 'Oliveira', 'Erica', 'erica.oliveira-ep.louadoudi@3wa.io', '$2b$10$MLyJVQuAN/QDuuhuEhlozua4o6Yee1WT3W5sHP1TzbGBdRXuFxSh2', 2),
(79, '2023-12-06', 'Ruiz', 'Adrian', 'adrian@gmail.com', '$2b$10$rHdaWhGpfotB5Mjfl77Qh.YeqCE9RSqpIhcUFvX.b.BHCHZ/pJNJe', 2),
(80, '2023-12-08', 'Ramos', 'Antonio', 'antonio@gmail.com', '$2b$10$768gv37ORsB.lkDzGSs2u.dS1BUDs46NAogmE7U8PqG23CC5YDe4y', 2),
(81, '2023-12-09', 'Araujo', 'Maria', 'maria@gmail.com', '$2b$10$HijbJ5tjjlJurNG/GkaDDehzqzE0e8Uuu/ooSp9.DrgmXOOg/cegS', 2),
(82, '2023-12-10', 'Araujo', 'Maria', 'araujo@gmail.com', '$2b$10$mBo2vPMl3iZXT8YUgGxmNuC9kHghUXHMN22B3VDjeRkwUqdUPN6iy', 2),
(83, '2023-12-10', 'Iorguer', 'Cris', 'cris@gmail.com', '$2b$10$jY8Rsu1nBLeGu.uW2I3gd.qnHsaO4JgN4GjAtUQqQv.WWbm.o1RzC', 2),
(84, '2023-12-11', 'Oliveira', 'Ravi', 'louadoudi@gmail.com', '$2b$10$/W7S5uC.lOE1D3eCLupzdOiYzQ0mWBQD5oPf4.NKuXDpsV7UF62US', 2),
(85, '2023-12-12', 'Pinheiro', 'Ravi', 'pinheiro@gmail.com', '$2b$10$NxFyADV00VB7IJUDNxbvxekXFFNuV3J88sq2AxWmL.dcYSkZA.deW', 2),
(86, '2023-12-13', 'Vilport', 'Cecile', 'cecile@gmail.com', '$2b$10$DifQ0kFgCT22ZpKDl.kvF.eJlyKVO/AShjZqtvM0m.24HgeoggQT.', 2),
(87, '2023-12-13', 'jury', 'jury', 'jury@jury.fr', '$2b$10$1ECv0./zXU07rW9wVkd7YuWqqxJaPI54LEYWvrd8wCDxJlpjVNVn2', 2);

-- --------------------------------------------------------

--
-- Structure de la table `user_type`
--

CREATE TABLE `user_type` (
  `id_user_type` int(11) NOT NULL,
  `wording` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user_type`
--

INSERT INTO `user_type` (`id_user_type`, `wording`) VALUES
(1, 'admin'),
(2, 'reader');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`id_author`);

--
-- Index pour la table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id_book`),
  ADD KEY `id_book_category` (`id_book_category`),
  ADD KEY `id_editor` (`id_editor`),
  ADD KEY `id_author` (`id_author`);

--
-- Index pour la table `book_category`
--
ALTER TABLE `book_category`
  ADD PRIMARY KEY (`id_book_category`);

--
-- Index pour la table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id_comment`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_book` (`id_book`);

--
-- Index pour la table `editor`
--
ALTER TABLE `editor`
  ADD PRIMARY KEY (`id_editor`);

--
-- Index pour la table `liked`
--
ALTER TABLE `liked`
  ADD KEY `id_book` (`id_book`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id_message`),
  ADD KEY `fk_user` (`id_user`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `id_user_type` (`id_user_type`);

--
-- Index pour la table `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`id_user_type`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `author`
--
ALTER TABLE `author`
  MODIFY `id_author` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT pour la table `books`
--
ALTER TABLE `books`
  MODIFY `id_book` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT pour la table `book_category`
--
ALTER TABLE `book_category`
  MODIFY `id_book_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `comment`
--
ALTER TABLE `comment`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT pour la table `editor`
--
ALTER TABLE `editor`
  MODIFY `id_editor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT pour la table `message`
--
ALTER TABLE `message`
  MODIFY `id_message` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT pour la table `user_type`
--
ALTER TABLE `user_type`
  MODIFY `id_user_type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`id_book_category`) REFERENCES `book_category` (`id_book_category`),
  ADD CONSTRAINT `books_ibfk_2` FOREIGN KEY (`id_editor`) REFERENCES `editor` (`id_editor`),
  ADD CONSTRAINT `books_ibfk_3` FOREIGN KEY (`id_author`) REFERENCES `author` (`id_author`);

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`id_book`) REFERENCES `books` (`id_book`);

--
-- Contraintes pour la table `liked`
--
ALTER TABLE `liked`
  ADD CONSTRAINT `liked_ibfk_1` FOREIGN KEY (`id_book`) REFERENCES `books` (`id_book`),
  ADD CONSTRAINT `liked_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_user_type`) REFERENCES `user_type` (`id_user_type`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
