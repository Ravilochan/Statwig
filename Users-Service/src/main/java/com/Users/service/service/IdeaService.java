package com.Users.service.service;

import com.Users.service.model.User;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public interface IdeaService {
    /**
     * Method to create new Billing in the db using mongo-db repository.
     * @param user
     */
    public void updateIdeas(User user);

    /**
     * Method to fetch all Billings from the db using mongo-db repository.
     * @return
     */
    public Collection<User> getAllIdeas();
}