package org.talentboost.memeapp.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.talentboost.memeapp.Levenshtein;
import org.talentboost.memeapp.model.Domain;
import org.talentboost.memeapp.model.Meme;
import org.talentboost.memeapp.model.Search;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

@Service
public class DomainService implements IDomainService {

    /**
     * The domain where each other memes can be shared
     */
    private static final String DOMAIN_URL = "http://localhost:8090/domain";

    private RestTemplate restTemplate;
    private String id;
    private Domain[] allDomains;
    private Meme[] currentDomainMemes;

    private String getClosestTitle(Map<String, Integer> map) {
        Map.Entry<String, Integer> min = null;
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            if (min == null || min.getValue() > entry.getValue()) {
                min = entry;
            }
        }
        return min.getKey();
    }

    private String findTheClosestTitle(String title) {
        Map<String, Integer> allClosestTitles = new HashMap<>();
        Levenshtein levenshtein = new Levenshtein();
        String currentTitle;
        for (int i = 0; i < this.currentDomainMemes.length; i++) {
            currentTitle = this.currentDomainMemes[i].getTitle();
            int result = levenshtein.distance(title, currentTitle);
            allClosestTitles.put(currentTitle, result);
        }
        return this.getClosestTitle(allClosestTitles);
    }


    private List<Meme> findTitle(String title) {
        List<Meme> memes = new ArrayList<>();
        for (int i = 0; i < this.currentDomainMemes.length; i++) {
            if (this.currentDomainMemes[i].getTitle().toLowerCase().contains(title.toLowerCase())) {
                memes.add(this.currentDomainMemes[i]);
            }
        }
        return memes;
    }

    public DomainService() {
        this.restTemplate = new RestTemplate();
    }

    /**
     * Register in DOMAIN_URL
     */
    @Override
    @PostConstruct
    public void registerOnInit() {
        String myServerName = "Funny";
        String myAddress = "http://localhost:8080";
        String path = DOMAIN_URL + "/register?name=" + myServerName + "&address=" + myAddress;
        this.id = this.restTemplate.postForObject(path, null, String.class);
    }

    /**
     * @return the domains of all registered users
     * @throws URISyntaxException
     */
    @Override
    public Domain[] getAllDomains() throws URISyntaxException {
        this.allDomains = this.restTemplate.getForObject(new URI(DOMAIN_URL), Domain[].class);
        return this.allDomains;
    }

    /**
     * @param domain the name of selected domain
     * @return all memes of this domain
     */
    @Override
    public Meme[] getMemes(String domain) {
        String foundAddress = "";
        for (Domain d : this.allDomains) {
            if (d.getName().equals(domain)) {
                foundAddress = d.getAddress();
                break;
            }
        }
        if (!foundAddress.equals("")) {
            this.currentDomainMemes = this.restTemplate.getForObject(foundAddress + "/meme", Meme[].class);
        }
        return this.currentDomainMemes;
    }

    /**
     * Search memes with the specified title.If no memes are found the
     * Levenshtein algorithm is used in order to find the meme with the closest title.
     *
     * @param title search by it
     * @return list of the found memes
     */
    @Override
    public Search getMemesByTitle(String title) {
        List<Meme> filteredMemes = this.findTitle(title);
        Search search = new Search();
        if (filteredMemes.size() > 0) {
            search.setSuggestion("No");
            search.setFoundMemes(filteredMemes);
            return search;
        }
        String suggestion = this.findTheClosestTitle(title);
        filteredMemes = this.findTitle(suggestion);
        search.setSuggestion(suggestion);
        search.setFoundMemes(filteredMemes);
        return search;
    }

    /**
     * @throws URISyntaxException
     */
    @Override
    @PreDestroy
    public void unregisterOnDestroy() throws URISyntaxException {
        final String path = DOMAIN_URL + "/deregister/" + this.id;
        this.restTemplate.delete(new URI(path));
    }
}
