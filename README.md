# cars

APIs permettant géré des voitures

# table user

CREATE TABLE `cars`.`user` ( `id` INT NOT NULL AUTO_INCREMENT , `email` MEDIUMTEXT NOT NULL , `name` MEDIUMTEXT NOT NULL , `password` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

# table car

CREATE TABLE `cars`.`car` ( `id` INT NOT NULL AUTO_INCREMENT , `user_id` INT NOT NULL , `registration` MEDIUMTEXT NOT NULL , `name` MEDIUMTEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

# table comment

CREATE TABLE `cars`.`comment` ( `id` INT NOT NULL AUTO_INCREMENT , `car_id` INT NOT NULL , `user_id` INT NOT NULL , `content` TEXT NOT NULL , `createdAt` INT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
