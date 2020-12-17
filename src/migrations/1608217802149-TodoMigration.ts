import {MigrationInterface, QueryRunner} from "typeorm";

export class TodoMigration1608217802149 implements MigrationInterface {
    name = 'TodoMigration1608217802149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `todo` (`id` int NOT NULL AUTO_INCREMENT, `task` varchar(255) NOT NULL, `list_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `todo` ADD CONSTRAINT `FK_1a5448d48035763b9dbab86555b` FOREIGN KEY (`list_id`) REFERENCES `list`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `todo` DROP FOREIGN KEY `FK_1a5448d48035763b9dbab86555b`");
        await queryRunner.query("DROP TABLE `todo`");
    }

}
