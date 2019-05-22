package org.talentboost.memeapp.service;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.talentboost.memeapp.exception.DeleteMemeImageException;

import java.io.*;

@Component
public class FileUploadService implements IFileUploadService {

    private static final String PATH = "src/main/resources/static/memeImages/";

    private void createNewImage(String title, MultipartFile file) throws IOException {
        File newMemeImage = new File(PATH + title);
        newMemeImage.createNewFile();
        OutputStream out = new FileOutputStream(newMemeImage);
        out.write(file.getBytes());
        out.close();
    }

    private void deleteImage(String nameOfFile) {
        File f = new File(PATH + nameOfFile);
        if (!f.delete()) {
            throw new DeleteMemeImageException("The image can not be deleted!");
        }
    }

    /**
     * Save the current image on the file system - PATH
     *
     * @param nameOfFile the name of the image
     * @param file       current image
     * @throws IOException
     */
    @Override
    public void uploadMemeImage(String nameOfFile, MultipartFile file) throws IOException {
        this.createNewImage(nameOfFile, file);
    }

    /**
     * @param nameOfFile the name of the image
     * @throws DeleteMemeImageException if the meme can not be deleted from the file system
     */
    @Override
    public void deleteMemeImage(String nameOfFile) throws DeleteMemeImageException {
        this.deleteImage(nameOfFile);
    }

    /**
     * Replace the current image with other image
     *
     * @param file          current image
     * @param nameOfFile    the name of the image
     * @param newNameOfFile the new uniq name of the image
     * @throws IOException
     */
    @Override
    public void editMemeImage(MultipartFile file, String nameOfFile, String newNameOfFile) throws IOException {
        this.deleteImage(nameOfFile);
        this.createNewImage(newNameOfFile, file);
    }
}
