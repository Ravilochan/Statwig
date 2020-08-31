package com.Users.service.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "friends")
public class Friends {
    @Id
    public String FromemailId;
    public List<String> friends;
    public List<String> blocked;
    public List<String> pending;
    public List<String> sent;
    public boolean signedIn;

    public Friends() {

    }


    public List<String> getRequested() {
        return sent;
    }

    public void setRequested(List<String> requested) {
        this.sent = requested;
    }

    public Friends(String FromemailId, List<String> friends, List<String> blocked, List<String> pending,  List<String> requested,Boolean
            signedIn) {

        this.FromemailId = FromemailId;
        this.friends= new ArrayList<>();
        this.blocked = new ArrayList<>();
        this.pending = new ArrayList<>();
        this.sent = new ArrayList<>();
        this.signedIn=true;
    }

    public List<String> getFriends() {
        return friends;
    }

    public void setFriends(List<String> friends) {
        this.friends = friends;
    }

    public List<String> getBlocked() {
        return blocked;
    }

    public void setBlocked(List<String> blocked) {
        this.blocked = blocked;
    }

    public List<String> getPending() {
        return pending;
    }

    public void setPending(List<String> pending) {
        this.pending = pending;
    }

    public boolean isSignedIn() {
        return signedIn;
    }

    public void setSignedIn(boolean signedIn) {
        this.signedIn = signedIn;
    }

    public String getFromemailId() {
        return FromemailId;
    }

    public void setFromemailId(String fromemailId) {
        FromemailId = fromemailId;
    }
}