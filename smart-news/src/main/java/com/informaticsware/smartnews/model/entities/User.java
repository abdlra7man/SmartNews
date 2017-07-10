package com.informaticsware.smartnews.model.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Set;

/**
 * Created by Name on 6/06/2017.
 */
@Entity
@Getter
@Setter
@Table(name = "users")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "removed")
    private String removed;

    @Column(name = "disabled")
    private String disabled;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "users_news", joinColumns = {
            @JoinColumn(name = "user_id", referencedColumnName = "id")}, inverseJoinColumns = {
            @JoinColumn(name = "news_id", referencedColumnName = "id")})
    private Set<News> news;

//    @OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL, mappedBy="user")
//    private List<News> news;
}
