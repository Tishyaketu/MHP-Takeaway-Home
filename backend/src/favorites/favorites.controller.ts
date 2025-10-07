// backend/src/favorites/favorites.controller.ts
import { Controller, Get, Post, Delete, Param, Body, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  // M4: GET /favorites
  @Get()
  getFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  // M4: POST /favorites
  @Post()
  addFavorite(@Body() movie: any) {
    return this.favoritesService.addFavorite(movie);
  }

  // M4: DELETE /favorites/:imdbID
  @Delete(':imdbID')
  @HttpCode(204)
  removeFavorite(@Param('imdbID') imdbID: string) {
    return this.favoritesService.removeFavorite(imdbID);
  }
}