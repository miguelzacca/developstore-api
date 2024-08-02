import { Favorites } from '../models/Favorites.js'
import { Products } from '../models/Products.js'
import { User } from '../models/User.js'

interface UserFavoritesProps {
  userModel: typeof User
  productModel: typeof Products
  favoritesModel: typeof Favorites
}

export const UserFavorites = ({
  userModel,
  productModel,
  favoritesModel,
}: UserFavoritesProps) => {
  userModel.belongsToMany(productModel, {
    through: favoritesModel,
    foreignKey: 'userId',
    as: 'favorites',
  })

  productModel.belongsToMany(userModel, {
    through: favoritesModel,
    foreignKey: 'productId',
  })
}
