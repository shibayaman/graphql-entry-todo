import {MigrationInterface, QueryRunner} from "typeorm";

export class ListMigration1606068447005 implements MigrationInterface {
    name = 'ListMigration1606068447005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `list` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `user_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `list` ADD CONSTRAINT `FK_a842f768ec87a346b0ee61fabba` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `list` DROP FOREIGN KEY `FK_a842f768ec87a346b0ee61fabba`");
        await queryRunner.query("DROP TABLE `list`");
    }

}
