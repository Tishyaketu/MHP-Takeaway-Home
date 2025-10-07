"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
let FavoritesService = class FavoritesService {
    favorites = new Map();
    constructor() {
        this.favorites.set('tt0468569', {
            imdbID: 'tt0468569',
            Title: 'The Dark Knight',
            Year: '2008',
            Poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
        });
    }
    getAllFavorites() {
        return Array.from(this.favorites.values());
    }
    addFavorite(movie) {
        if (this.favorites.has(movie.imdbID)) {
            return { error: 'Movie already in favorites' };
        }
        this.favorites.set(movie.imdbID, movie);
        return movie;
    }
    removeFavorite(imdbID) {
        if (!this.favorites.has(imdbID)) {
            return { error: 'Movie not found in favorites' };
        }
        this.favorites.delete(imdbID);
        return { success: true };
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map