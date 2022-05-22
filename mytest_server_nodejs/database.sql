CREATE TABLE `cadastro`(
    `cadastro_id` INT(11) NOT NULL AUTO_INCREMENT,
    `cadastro_status` TINYINT(1) DEFAULT 1,
    `nome` VARCHAR(120) NOT NULL,
    `usuario` VARCHAR(45) NOT NULL UNIQUE,
    `e_mail` VARCHAR(60) NOT NULL UNIQUE,
    `senha` VARCHAR(45) NOT NULL,
    `token` VARCHAR(500),

    PRIMARY KEY(`cadastro_id`)
) ENGINE = INNODB;