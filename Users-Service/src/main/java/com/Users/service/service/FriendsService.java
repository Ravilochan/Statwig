package com.Users.service.service;

import com.Users.service.model.Confirmation;
import com.Users.service.model.Friends;
import com.Users.service.model.User;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

public interface FriendsService {

    /**
     * Method to fetch Billing by id using mongo-db repository.
     * @param emailId
     * @return
     */
    public List<String> findFriendsByEmailId(String emailId);

    /**
     * Method to fetch Billing by id using mongo-db repository.
     * @param emailId
     * @return
     */
    public List<String> findBlockedByEmailId(String emailId);

    /**
     * Method to fetch Billing by id using mongo-db repository.
     * @param emailId
     * @return
     */
    public List<String> findRequestedByEmailId(String emailId);

    /**
     * Method to fetch Billing by id using mongo-db repository.
     * @param emailId
     * @return
     */
    public List<String> findPendingByEmailId(String emailId);

    /**
     * Method to update Billing by id using mongo-db repository.
     * @param user
     */
    public void updateFriends(Friends user);

    /**
     * Method to update Billing by id using mongo-db repository.
     * @param user
     */
    public void updateSingIn(Friends user);

    /**
     * Method to fetch Billing by id using mongo-db repository.
     * @param emailId
     * @return
     */
    public Friends findByEmailIdinFriends(String emailId);




}