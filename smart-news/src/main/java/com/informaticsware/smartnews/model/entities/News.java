package com.informaticsware.smartnews.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * Created by Name on 6/06/2017.
 */
@Entity
@Getter
@Setter
@Table(name = "news")
public class News implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "link")
    private String link;

    @Column(name = "author")
    private String author;

    @ManyToMany(mappedBy = "news", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<User> users;


//    @ManyToOne(fetch=FetchType.LAZY)
//    @JoinColumn(name="user_id")
//    private User user;
}
