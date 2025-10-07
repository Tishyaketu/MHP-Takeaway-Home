"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let MoviesService = class MoviesService {
    apiKey = process.env.OMDB_API_KEY || '';
    baseUrl = process.env.OMDB_BASE_URL || '';
    async searchMovies(query) {
        try {
            const response = await axios_1.default.get(this.baseUrl, {
                params: {
                    apikey: this.apiKey,
                    s: query,
                    type: 'movie',
                },
            });
            if (response.data.Response === 'False') {
                if (response.data.Error === 'Movie not found!') {
                    return { movies: [] };
                }
                return { movies: [], error: response.data.Error };
            }
            const movies = response.data.Search.map((movie) => ({
                imdbID: movie.imdbID,
                Title: movie.Title,
                Year: movie.Year,
                Poster: movie.Poster === 'N/A' ? null : movie.Poster,
            }));
            return { movies };
        }
        catch (error) {
            console.error('OMDb API error:', error);
            return { movies: [], error: 'Failed to fetch movies' };
        }
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)()
], MoviesService);
//# sourceMappingURL=movies.service.js.map