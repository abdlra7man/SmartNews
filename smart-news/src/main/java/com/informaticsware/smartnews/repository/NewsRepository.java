package com.informaticsware.smartnews.repository;

import com.informaticsware.smartnews.model.entities.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Name on 6/06/2017.
 */
@Transactional
public interface NewsRepository extends JpaRepository<News, Long>{
    List<News> findByLink(final String link);
    List<News> findByTitleContaining(final String keyword);
}
