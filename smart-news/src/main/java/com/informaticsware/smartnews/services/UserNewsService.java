package com.informaticsware.smartnews.services;

import com.informaticsware.smartnews.exceptions.UserNewsException;
import com.informaticsware.smartnews.model.dto.SmartNewsDTO;
import com.informaticsware.smartnews.model.entities.News;
import com.informaticsware.smartnews.model.entities.User;
import com.informaticsware.smartnews.repository.NewsRepository;
import com.informaticsware.smartnews.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by Name on 6/06/2017.
 */
@Service
public class UserNewsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    NewsRepository newsRepository;

    public News getNews(Long newsId){
        return newsRepository.findOne(newsId);
    }

    public News getNewsByLink(String link){
        List<News> news = newsRepository.findByLink(link);
        return news.isEmpty() ? null : news.get(0);
    }

    public User getUser(Long userId){
        return userRepository.findOne(userId);
    }

    public User getUserByUserName(String userName){
        return userRepository.findByUsername(userName);
    }

    public List<News> searchNewsByTitle(final String keyword){
        return newsRepository.findByTitleContaining(keyword);
    }

    public List<News> getAllNews(){
        return newsRepository.findAll();
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User createUser(User user){
        try {
            return userRepository.saveAndFlush(user);
        } catch (Exception de){
            throw new UserNewsException(de.getMessage());
        }
    }

    public News createNews(News news){
        try {
            return newsRepository.saveAndFlush(news);
        } catch (Exception de){
            throw new UserNewsException(de.getMessage());
        }
    }

    public User upsertUserNews(SmartNewsDTO smartNewsDTO){
        User user = null;
        try {
            user = userRepository.findByUsername(smartNewsDTO.getUserName());
            if(user == null){
                user = new User();
                user.setUsername(smartNewsDTO.getUserName());
                user = createUser(user);
                user.setNews(new HashSet<News>());
            }
            News news = getNewsByLink(smartNewsDTO.getLink());
            if(news == null){
                news = new News();
                news.setAuthor(smartNewsDTO.getAuthor());
                news.setDescription(smartNewsDTO.getDescirption());
                news.setTitle(smartNewsDTO.getTitle());
                news.setLink(smartNewsDTO.getLink());
                news = createNews(news);
            }
            user.getNews().add(news);
            user = userRepository.saveAndFlush(user);
        } catch (Exception de){
            throw new UserNewsException(de.getMessage());
        }
        return user;
    }

//    public MpCategory createCategory(MpCategory category){
//        validateCategoryTitleAndDescription(category);
//        try {
//            return categoryRepository.saveAndFlush(category);
//        } catch (DataIntegrityViolationException de){
//            throw new MpCategoryException(MpCategoryException.CATEGORY_TITLE_NON_UNIQUE);
//        }
//    }
//
//    public MpCategory updateCategory(MpCategory newCategory){
//        validateCategoryTitleAndDescription(newCategory);
//        MpCategory category = categoryRepository.findOne(newCategory.getId());
//        if(category == null){
//            throw new MpCategoryException(MpCategoryException.CATEGORY_NOT_FOUND);
//        }
//        category.setTitle(newCategory.getTitle());
//        category.setDescription(newCategory.getDescription());
//        try {
//            return categoryRepository.saveAndFlush(category);
//        } catch (DataIntegrityViolationException de){
//            throw new MpCategoryException(MpCategoryException.CATEGORY_TITLE_NON_UNIQUE);
//        }
//    }
//
//    public void deleteCategory(Long categoryId){
//        MpCategory category = getCategory(categoryId);
//        if (category == null){
//            throw new MpCategoryException(MpCategoryException.CATEGORY_NOT_FOUND);
//        }
//        categoryRepository.delete(categoryId);
//    }
//
//    public Set<MpUnit> getUnitsInCategory(Long categoryId){
//        MpCategory category = getCategory(categoryId);
//        if (category == null){
//            throw new MpCategoryException(MpCategoryException.CATEGORY_NOT_FOUND);
//        }
//        return category.getMpUnitSet();
//    }



}
