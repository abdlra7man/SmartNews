package com.informaticsware.smartnews.model.dto;

import com.informaticsware.smartnews.model.Action;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * Created by Name on 8/06/2017.
 */
@Getter
@Setter
public class SmartNewsDTO {
    private String userName;
    private String title;
    private String description;
    private String author;
    private String link;
    private Action action;
    private Long actionTimeStamp;
    private Long newsPublicationTimeStamp;
}
