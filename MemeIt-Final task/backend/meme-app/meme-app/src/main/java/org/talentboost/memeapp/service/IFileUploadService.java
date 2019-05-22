package org.talentboost.memeapp.service;

import org.springframework.web.multipart.MultipartFile;
import org.talentboost.memeapp.exception.DeleteMemeImageException;

import java.io.IOException;

public interface IFileUploadService {
    void uploadMemeImage(String nameOfFile, MultipartFile file) throws IOException;

    void deleteMemeImage(String nameOfFile) throws DeleteMemeImageException;

    void editMemeImage(MultipartFile file, String nameOfFile, String newName) throws IOException;
}
