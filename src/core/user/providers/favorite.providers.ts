import { Favorites } from '../favorites/favorite.entity.js'

export const favoriteProviders = [
  {
    provide: 'FAVORITES',
    useValue: Favorites,
  },
]
