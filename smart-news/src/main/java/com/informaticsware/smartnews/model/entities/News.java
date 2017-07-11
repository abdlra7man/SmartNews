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

    @Column(name = "content")
    private String content;

    @Column(name = "publish_date")
    private String publishDate;

    @OneToMany(mappedBy = "news")
    @JsonIgnore
    private Set<UserNews> userNews;
}
