package com.Users.service.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

public class FriendRequest {
    public String fromEmailId;
    public String toEmailId;

    public FriendRequest(String fromEmailId,String toEmailId) {
        this.fromEmailId = fromEmailId;
        this.toEmailId = toEmailId;
    }

    public String getFromEmailId() {
        return fromEmailId;
    }

    public void setFromEmailId(String fromEmailId) {
        this.fromEmailId = fromEmailId;
    }

    public String getToEmailId() {
        return toEmailId;
    }

    public void setToEmailId(String toEmailId) {
        this.toEmailId = toEmailId;
    }
}