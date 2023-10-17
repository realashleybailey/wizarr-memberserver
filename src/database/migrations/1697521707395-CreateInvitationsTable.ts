import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateInvitationsTable1697521707395 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'invitations',
      columns: [
        {
          name: 'id',
          type: 'bigint',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        { name: 'code', type: 'varchar', length: '50', isUnique: true },
        { name: 'user_id', type: 'bigint', isNullable: true },
        { name: 'used', type: 'boolean', default: false },
      ],
    });

    await queryRunner.createTable(table);

    await queryRunner.createForeignKey(
      'invitations',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('invitations');
  }
}
