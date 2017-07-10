package com.informaticsware.smartnews.repository;

import com.informaticsware.smartnews.model.entities.News;
import com.informaticsware.smartnews.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Name on 6/06/2017.
 */
@Transactional
public interface UserRepository extends JpaRepository<User, Long>{
    //List<News> findByTitleContaining(final String keyword);
    User findByUsername (String userName);
}
