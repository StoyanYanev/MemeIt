package org.talentboost.memeapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import org.talentboost.memeapp.model.Meme;

@Repository
public interface IMemeRepository extends JpaRepository<Meme, Integer> {
}