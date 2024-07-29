import { ProductsEntity } from '../../../domain/entities/products.js'
import { sequelize } from '../sequelize.js'
import { INTEGER, STRING, DECIMAL } from 'sequelize'

export const Products = ProductsEntity.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productName: {
      type: STRING,
      unique: true,
      allowNull: false,
    },
    category: {
      type: STRING,
      allowNull: false,
    },
    info: {
      type: STRING,
      allowNull: false,
    },
    img: {
      type: STRING,
      allowNull: false,
    },
    oldPrice: {
      type: DECIMAL,
      allowNull: true,
    },
    price: {
      type: DECIMAL,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
  },
)
