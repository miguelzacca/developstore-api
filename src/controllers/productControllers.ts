import { Controller } from '../types/global'
import { products } from '../data/products.js'
import { utils } from '../utils.js'

class ProductControllers {
  public getProducts: Controller = (req, res) => {
    try {
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
