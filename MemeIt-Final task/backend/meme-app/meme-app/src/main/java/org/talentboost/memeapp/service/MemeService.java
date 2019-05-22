package org.talentboost.memeapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.talentboost.memeapp.model.Meme;
import org.talentboost.memeapp.repo.IMemeRepository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class MemeService implements IMemeService {

    /**
     * The path where the image is stored
     */
    private static final String MEME_PATH = "/memeImages/";

    @Autowired
    private IMemeRepository memeRepository;
    @Autowired
    private IFileUploadService fileUploadService;

    private Sort sortByIdDesc() {
        return new Sort(Sort.Direction.DESC, "id");
    }

    private List<Meme> allMemes() {
        List<Meme> all = this.memeRepository.findAll(this.sortByIdDesc());
        all.forEach(meme -> meme.setImage(MEME_PATH + meme.getImage()));
        return all;
    }

    private String getExtensionOfFile(MultipartFile file) {
        String name = file.getOriginalFilename();
        if (name.equals("blob")) {
            return ".jpg";
        }
        String extension = "." + name.split("\\.")[1];
        return extension;
    }

    private String generateUniqTitle() {
        String uniqueID = UUID.randomUUID().toString();
        return uniqueID;
    }

    private String updateFile(int id, MultipartFile file) throws IOException {
        Meme meme = this.memeRepository.findById(id).get();
        String newUniqName = this.generateUniqTitle();
        this.fileUploadService.editMemeImage(file, meme.getImage(), newUniqName);
        return newUniqName;
    }

    /**
     * Get the title and the name of file of the current meme from database
     *
     * @return all memes
     */
    @Override
    public List<Meme> getAllMemes() {
        return this.allMemes();
    }

    /**
     * @param page         current page
     * @param memesPerPage the number of memes per page
     * @return specific number(defined from the variable memesPerPage) of images/memes
     */
    @Override
    public List<Meme> getMemesPerPage(int page, int memesPerPage) {
        List<Meme> allMemes = this.allMemes();
        List<Meme> pagedMemes = new ArrayList<>();
        for (int i = (page - 1) * memesPerPage; i < page * memesPerPage && i < allMemes.size(); i++) {
            pagedMemes.add(allMemes.get(i));
        }
        return pagedMemes;
    }

    /**
     * Search meme by id in the database
     *
     * @param id of the current meme
     * @return the found meme
     */
    @Override
    public ResponseEntity<Meme> findMemeById(int id) {
        return this.memeRepository.findById(id).map(result -> ResponseEntity.ok().body(result))
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * @return the number of memes from database
     */
    @Override
    public long getNumberOfRecords() {
        return this.memeRepository.count();
    }

    /**
     * @param title of the searched memes
     * @return the memes with the searched title
     */
    @Override
    public List<Meme> filteredMemesByTitle(String title) {
        List<Meme> allMemes = this.allMemes();
        List<Meme> filteredMeme = new ArrayList<>();
        for (int i = 0; i < allMemes.size(); i++) {
            if (allMemes.get(i).getTitle().toLowerCase().contains(title.toLowerCase())) {
                filteredMeme.add(allMemes.get(i));
            }
        }
        return filteredMeme;
    }

    /**
     * Create meme with uniq title and save the title and the name of the image in database
     *
     * @param title of the current meme
     * @param file  current image
     * @return created meme
     * @throws IOException
     */
    @Override
    public Meme createMeme(String title, MultipartFile file) throws IOException {
        String imageName = this.generateUniqTitle() + this.getExtensionOfFile(file);
        Meme newMeme = new Meme();
        newMeme.setTitle(title);
        newMeme.setImage(imageName);
        this.fileUploadService.uploadMemeImage(imageName, file);
        return this.memeRepository.save(newMeme);
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
    @Override
    public ResponseEntity<Meme> updateMeme(int id, String title, MultipartFile file) {
        return this.memeRepository.findById(id)
                .map(result -> {
                    if (file != null) {
                        try {
                            String newName = this.updateFile(id, file);
                            result.setImage(newName);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    result.setTitle(title);
                    Meme update = this.memeRepository.save(result);
                    return ResponseEntity.ok().body(update);
                }).orElse(ResponseEntity.notFound().build());
    }

    /**
     * Delete the meme from database
     *
     * @param id of the current meme
     * @return
     */
    @Override
    public ResponseEntity<Meme> deleteMeme(int id) {
        return this.memeRepository.findById(id)
                .map(record -> {
                    this.fileUploadService.deleteMemeImage(record.getImage());
                    Meme update = this.memeRepository.findById(id).get();
                    this.memeRepository.deleteById(id);
                    return ResponseEntity.ok().body(update);
                }).orElse(ResponseEntity.notFound().build());
    }
}
