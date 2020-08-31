package com.Users.service.service;
import com.Users.service.dao.UserDao;
import com.Users.service.model.Confirmation;
import com.Users.service.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collection;

@Service
public class UserImpl implements UserService{

    @Autowired
    UserDao dao;

    @Override
    public void createUser(User user) {
        dao.save(user);
    }

    @Override
    public Collection<User> getAllUsers() {
        return (Collection<User>) dao.findAll();
    }

    @Override
    public User findByUserName(String username)
    {
        return dao.findByUsername(username);
    }

    @Override
    public User findByEmailId(String emailId)
    {
        return dao.findByEmailId(emailId);
    }

    @Override
    public void updateAccount(User user) {
        dao.save(user);
    }

    @Override
    public void deleteUser(User user) {
        dao.delete(user);
    }

    @Override
    public void sendEmail(User user) {
        dao.save(user);
    }

    @Override
    public User getPhoto(String title) {
        return dao.findByImageId(title);
    }
}