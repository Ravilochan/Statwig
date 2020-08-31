package com.Users.service.service;

import com.Users.service.dao.UserDao;
import com.Users.service.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
@Service
public class IdeaServiceImpl implements IdeaService{

    @Autowired
    UserDao dao;

    @Override
    public void updateIdeas(User user) {

    }

    @Override
    public Collection<User> getAllIdeas() {
        return (Collection<User>) dao.findAll();
    }

}