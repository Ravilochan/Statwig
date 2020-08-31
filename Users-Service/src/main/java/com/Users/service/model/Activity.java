package com.Users.service.model;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "activity")
public class Activity {
    @Id
    public String idea_headline;

    public String getIdea_headline() {
        return idea_headline;
    }

    public void setIdea_headline(String idea_headline) {
        this.idea_headline = idea_headline;
    }

    public String getIdea_owner() {
        return idea_owner;
    }

    public void setIdea_owner(String idea_owner) {
        this.idea_owner = idea_owner;
    }

    public int getVisitCount() {
        return visitCount;
    }

    public void setVisitCount(int visitCount) {
        this.visitCount = visitCount;
    }

    public String idea_owner;
    public int visitCount;

    public Activity(String idea_headline, String idea_owner, int visitCount)
    {
        this.idea_headline = idea_headline;
        this.idea_owner = idea_owner;
        this.visitCount = visitCount;
    }
}