package com.informaticsware.smartnews.controllers;

import com.informaticsware.smartnews.exceptions.JSONError;
import com.informaticsware.smartnews.exceptions.UserNewsException;
import com.informaticsware.smartnews.model.dto.SmartNewsDTO;
import com.informaticsware.smartnews.model.entities.News;
import com.informaticsware.smartnews.services.UserNewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.ResponseEntity.status;
/**
 * Created by Name on 9/06/2017.
 */
@RestController
@RequestMapping("/api/v1/usernews/")
public class UserNewsController {

    @Autowired
    UserNewsService userNewsService;

    @GetMapping
    public ResponseEntity getAllUsers(@RequestParam(value="userId", required=false) Long userId){
        if (userId != null) {
            return status(HttpStatus.OK).body(userNewsService.getUser(userId));
        }
        return status(HttpStatus.OK).body(userNewsService.getAllUsers());
    }

    @PostMapping
    public ResponseEntity upsertUserNews(@RequestBody SmartNewsDTO smartNewsDTO){
        try {
            return status(HttpStatus.OK).body(userNewsService.upsertUserNews(smartNewsDTO));
        } catch (UserNewsException ce){
            return status(HttpStatus.UNPROCESSABLE_ENTITY).body(new JSONError(ce.getMessage()));
        } catch (Exception e){
            return status(HttpStatus.INTERNAL_SERVER_ERROR).body(new JSONError(e.getMessage()));
        }
    }
}
