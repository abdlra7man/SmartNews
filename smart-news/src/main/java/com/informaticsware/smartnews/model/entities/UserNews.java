package com.informaticsware.smartnews.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.informaticsware.smartnews.model.Action;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

/**
 * Created by Name on 6/06/2017.
 */
@Entity
@Getter
@Setter
@Table(name = "users_news")
public class UserNews implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "news_id")
    private News news;


    @Column(name = "action")
    @Enumerated(EnumType.STRING)
    private Action action;

    @Column(name = "action_date")
    private Date actionDate;

}
