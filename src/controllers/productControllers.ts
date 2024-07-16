import { Controller, ProductModel } from '../types/global'
import { Products } from '../models/Products.js'
import { utils } from '../utils.js'

class ProductControllers {
  public getProducts: Controller = async (req, res) => {
    try {
      const products: ProductModel[] = await Products.findAll()
      res.status(200).json(products)
    } catch (err) {
      utils.handleError(res, err)
    }
  }
}

export const productControllers = new ProductControllers()
