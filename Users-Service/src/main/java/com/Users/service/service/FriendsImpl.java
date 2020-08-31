package com.Users.service.service;

import com.Users.service.dao.FriendsDao;
import com.Users.service.model.Friends;
import com.Users.service.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class FriendsImpl implements FriendsService {

    @Autowired
    FriendsDao friendsDao;

    @Override
    public List<String> findFriendsByEmailId(String emailId){
        return friendsDao.findFriendsByEmailId(emailId);
    }
    @Override
    public List<String> findRequestedByEmailId(String emailId){
        return friendsDao.findRequestedByEmailId(emailId);
    }
    @Override
    public List<String> findPendingByEmailId(String emailId){
        return friendsDao.findPendingByEmailId(emailId);
    }
    @Override
    public List<String> findBlockedByEmailId(String emailId){
        return friendsDao.findBlockedByEmailId(emailId);
    }

    @Override
    public void updateFriends(Friends users){
        friendsDao.save(users);
    }

    @Override
    public void updateSingIn(Friends users){
        friendsDao.save(users);
    }

    @Override
    public Friends findByEmailIdinFriends(String emailId)
    {
        return friendsDao.findByEmailIdinFriends(emailId);
    }



}
