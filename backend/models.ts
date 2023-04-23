import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "Recorded",
})
export class Recorded extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  box!:number;
  
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  Gamenum!:number;
  
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  Start!:string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  Xmove!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  Omove!: number;
  
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  isXwin!:boolean;

}