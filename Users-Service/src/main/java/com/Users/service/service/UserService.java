package com.Users.service.service;

import com.Users.service.model.Confirmation;
import com.Users.service.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;

public interface UserService {

    /**
     * Method to create new Billing in the db using mongo-db repository.
     * @param user
     */
    public void createUser(User user);

    /**
     * Method to fetch all Billings from the db using mongo-db repository.
     * @return
     */
    public Collection<User> getAllUsers();

    /**
     * Method to fetch Billing by id using mongo-db repository.
     * @param username
     * @return
     */
    public User findByUserName(String username);

    /**
     * Method to fetch Billing by id using mongo-db repository.
     * @param emailId
     * @return
     */
    public User findByEmailId(String emailId);

    /**
     * Method to update Billing by id using mongo-db repository.
     * @param user
     */
    public void updateAccount(User user);

    /**
     * Method to delete Billing by id using mongo-db repository.
     * @param user
     */
    public void deleteUser(User user);

    public void sendEmail(User user);

    //public String addPhoto(String title, MultipartFile file);

    public User getPhoto(String id);

}