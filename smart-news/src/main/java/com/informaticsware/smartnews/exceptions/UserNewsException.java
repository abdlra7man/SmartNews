package com.informaticsware.smartnews.exceptions;

/**
 * Created by Name on 23/06/2017.
 */
public class UserNewsException extends RuntimeException{

    public final static String USER_NEWS_NON_UNIQUE = "News text should be unique";

    public UserNewsException(String message){
        super(message);
    }

}
