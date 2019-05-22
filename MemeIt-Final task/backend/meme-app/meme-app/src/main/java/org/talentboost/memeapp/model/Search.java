package org.talentboost.memeapp.model;

import java.util.List;

public class Search {

    private String suggestion;
    private List<Meme> foundMemes;

    public Search() {

    }

    public Search(String suggestion, List<Meme> foundMemes) {
        this.suggestion = suggestion;
        this.foundMemes = foundMemes;
    }

    public String getSuggestion() {
        return this.suggestion;
    }

    public List<Meme> getFoundMemes() {
        return this.foundMemes;
    }

    public void setSuggestion(String suggestion) {
        this.suggestion = suggestion;
    }

    public void setFoundMemes(List<Meme> foundMemes) {
        this.foundMemes = foundMemes;
    }
}
