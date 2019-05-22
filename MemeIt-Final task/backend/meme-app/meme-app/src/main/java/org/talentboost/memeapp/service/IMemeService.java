package org.talentboost.memeapp.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.talentboost.memeapp.model.Meme;

import java.io.IOException;
import java.util.List;

@Service
public interface IMemeService {
    List<Meme> getAllMemes();

    List<Meme> getMemesPerPage(int page, int memesPerPage);

    ResponseEntity<Meme> findMemeById(int id);

    long getNumberOfRecords();

    List<Meme> filteredMemesByTitle(String title);

    Meme createMeme(String title, MultipartFile file) throws IOException;

    ResponseEntity<Meme> updateMeme(int id, String title, MultipartFile file);

    ResponseEntity<Meme> deleteMeme(int id);
}
