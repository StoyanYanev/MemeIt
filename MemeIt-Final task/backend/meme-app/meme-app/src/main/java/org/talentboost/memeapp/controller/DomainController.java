package org.talentboost.memeapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.talentboost.memeapp.model.Domain;
import org.talentboost.memeapp.model.Meme;
import org.talentboost.memeapp.model.Search;
import org.talentboost.memeapp.service.DomainService;

import java.net.URISyntaxException;

@CrossOrigin
@RestController
public class DomainController {

    @Autowired
    DomainService domainService;

    /**
     * @return the domains of all registered users
     */
    @GetMapping(path = "/domains")
    public Domain[] getAllDomains() {
        try {
            return this.domainService.getAllDomains();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * @param domain the name of selected domain
     * @return all memes of this domain
     */
    @GetMapping(path = "/domainMemes/{domain}")
    public Meme[] getMemes(@PathVariable String domain) {
        return this.domainService.getMemes(domain);
    }

    /**
     * Search memes with the specified title.If no memes are found the
     * Levenshtein algorithm is used in order to find the meme with the closest title.
     *
     * @param term search by it
     * @return list of the found memes
     */
    @GetMapping(path = "/closestMatch/{term}")
    public Search findTheClosestMatch(@PathVariable String term) {
        return this.domainService.getMemesByTitle(term);
    }
}
