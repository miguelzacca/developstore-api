import { Controller, ProductModel } from '../types/global'
import { Products } from '../models/Products.js'
import { utils } from '../utils.js'

class ProductControllers {
  public getProducts: Controller = async (req, res) => {
    try {
      const products: ProductModel[] = await Products.findAll()
      const { category } = req.query

      const data = category
        ? products.filter((el) => el.category === category)
        : products

      res.status(200).json(data)
    } catch (err) {
      utils.handleError(res, err)
    }
  }
}

export const productControllers = new ProductControllers()
