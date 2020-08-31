package com.Users.service.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Document(collection = "registration")
public class Confirmation {
    @Id
    public String tokenId;
    public String token;
    public Date date;
    public String username;

    private User user;

    public Confirmation(User user) {
        this.date = new Date();
        this.token = UUID.randomUUID().toString();
        this.user = user;
        this.username = user.getUsername();
    }

    public String getTokenId() {
        return tokenId;
    }

    public void setTokenId(String tokenId) {
        this.tokenId = tokenId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    // getters and setters
}