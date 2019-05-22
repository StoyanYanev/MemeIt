import { MemeData } from './meme-data';

export class Search {
    suggestion: string;
    foundMemes: MemeData[];
    setSuggestion(suggestion: string) {
        this.suggestion = suggestion;
    }
    setFoundMemes(foundMemes: MemeData[]) {
        this.foundMemes = foundMemes;
    }
}
