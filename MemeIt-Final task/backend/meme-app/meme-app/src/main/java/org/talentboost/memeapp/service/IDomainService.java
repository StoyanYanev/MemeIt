package org.talentboost.memeapp.service;

import org.talentboost.memeapp.model.Domain;
import org.talentboost.memeapp.model.Meme;
import org.talentboost.memeapp.model.Search;

import java.net.URISyntaxException;

public interface IDomainService {
    void registerOnInit();

    Domain[] getAllDomains() throws URISyntaxException;

    Meme[] getMemes(String domain);

    Search getMemesByTitle(String title);

    void unregisterOnDestroy() throws URISyntaxException;
}
