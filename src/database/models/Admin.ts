import { Table, Column, Model, DataType } from 'sequelize-typescript';


@Table({
    tableName: 'admins',
    paranoid: true,
    timestamps: true,
    underscored: true
})
export class Admin extends Model<Admin> {
    @Column({
        autoIncrement: true,
        primaryKey: true,
        type: DataType.INTEGER,
    })
    id!: number;

    @Column({
        primaryKey:true,
        type: DataType.UUIDV4,
        defaultValue: DataType.UUIDV4,
    })
    uuid!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    displayName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    enabled!: boolean;
}

export default Admin;