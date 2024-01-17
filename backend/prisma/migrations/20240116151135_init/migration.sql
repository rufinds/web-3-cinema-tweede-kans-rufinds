-- CreateTable
CREATE TABLE `Film` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titel` VARCHAR(191) NOT NULL,
    `beschrijving` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `trailer` VARCHAR(191) NOT NULL DEFAULT 'https://www.youtube.com',

    UNIQUE INDEX `Film_titel_key`(`titel`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `naam` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`naam`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cast` (
    `naam` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`naam`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Zaal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `naam` VARCHAR(191) NOT NULL,
    `capaciteit` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Voorstelling` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `starttijd` DATETIME(3) NOT NULL,
    `prijs` INTEGER NOT NULL,
    `datum` DATETIME(3) NOT NULL,
    `filmId` INTEGER NOT NULL,
    `zaalId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `aantal` INTEGER NOT NULL,
    `totalePrijs` INTEGER NOT NULL,
    `datum` DATETIME(3) NOT NULL,
    `gebruikerId` INTEGER NOT NULL,
    `voorstellingId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gebruiker` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `voornaam` VARCHAR(191) NOT NULL,
    `achternaam` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `wachtwoord` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FilmToGenre` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_FilmToGenre_AB_unique`(`A`, `B`),
    INDEX `_FilmToGenre_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CastToFilm` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CastToFilm_AB_unique`(`A`, `B`),
    INDEX `_CastToFilm_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Voorstelling` ADD CONSTRAINT `Voorstelling_filmId_fkey` FOREIGN KEY (`filmId`) REFERENCES `Film`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Voorstelling` ADD CONSTRAINT `Voorstelling_zaalId_fkey` FOREIGN KEY (`zaalId`) REFERENCES `Zaal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_gebruikerId_fkey` FOREIGN KEY (`gebruikerId`) REFERENCES `Gebruiker`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_voorstellingId_fkey` FOREIGN KEY (`voorstellingId`) REFERENCES `Voorstelling`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FilmToGenre` ADD CONSTRAINT `_FilmToGenre_A_fkey` FOREIGN KEY (`A`) REFERENCES `Film`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FilmToGenre` ADD CONSTRAINT `_FilmToGenre_B_fkey` FOREIGN KEY (`B`) REFERENCES `Genre`(`naam`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CastToFilm` ADD CONSTRAINT `_CastToFilm_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cast`(`naam`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CastToFilm` ADD CONSTRAINT `_CastToFilm_B_fkey` FOREIGN KEY (`B`) REFERENCES `Film`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
