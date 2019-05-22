package org.talentboost.memeapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.talentboost.memeapp.model.Meme;
import org.talentboost.memeapp.service.MemeService;

import java.io.*;
import java.util.List;

@CrossOrigin()
@RestController
public class MemeController {

    @Autowired
    MemeService memeService;

    /**
     * @return all memes
     */
    @GetMapping(path = "/meme")
    public List<Meme> returnAllMemes() {
        return this.memeService.getAllMemes();
    }

    /**
     * @param page         current page
     * @param memesPerPage the number of memes per page
     * @return specific number(defined from the variable memesPerPage) of images/memes
     */
    @GetMapping("/memes/{page}/{memesPerPage}")
    public List<Meme> returnPagedMemes(@PathVariable int page, @PathVariable int memesPerPage) {
        return this.memeService.getMemesPerPage(page, memesPerPage);
    }

    /**
     * Search meme by id in the database
     *
     * @param id of the current meme
     * @return the found meme
     */
    @GetMapping(path = "/find/{id}")
    public ResponseEntity<Meme> getMemeById(@PathVariable int id) {
        return this.memeService.findMemeById(id);
    }

    /**
     * @return the number of memes from database
     */
    @GetMapping(path = "/numberOfRecords")
    public long returnNumberOfRecords() {
        return this.memeService.getNumberOfRecords();
    }

    /**
     * @param term of the searched memes
     * @return the memes with the searched title
     */
    @PostMapping(value = "/filtered")
    public List<Meme> filteredMemes(@RequestBody String term) {
        return this.memeService.filteredMemesByTitle(term);
    }

    /**
     * Create meme with uniq title and save the title and the name of the image in database
     *
     * @param title of the current meme
     * @param file  current image
     * @return created meme
     */
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Meme createMeme(@RequestParam String title, @RequestParam("file") MultipartFile file) {
        Meme newMeme = new Meme();
        try {
            newMeme = this.memeService.createMeme(title, file);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return newMeme;
    }

    /**
     * Update the title of the current meme in the database
     * If the file is received as parameter, replace the image with it.
     *
     * @param id    of the current meme
     * @param title of the new meme
     * @param file  current image (optional parameter)
     * @return updated meme
     */
    @PutMapping(value = "/update/{id}")
    public ResponseEntity<Meme> updateCurrentMeme(@PathVariable("id") int id, @RequestParam String title, @RequestParam(value = "file", required = false) MultipartFile file) {
        return this.memeService.updateMeme(id, title, file);
    }

    /**
     * Delete the meme from database
     *
     * @param id of the current meme
     * @return
     */
    @DeleteMapping(path = {"/delete/{id}"})
    public ResponseEntity<Meme> deleteCurrentMeme(@PathVariable("id") int id) {
        return this.memeService.deleteMeme(id);
    }
}