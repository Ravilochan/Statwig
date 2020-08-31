package com.Users.service.dao;

import com.Users.service.model.Friends;
import com.Users.service.model.User;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public
interface FriendsDao extends CrudRepository<Friends, String> {
    @Query(value="{ '_id' : ?0 }", fields="{'friends': 1}")
    List<String> findFriendsByEmailId(String emailId);
    @Query(value="{ '_id' : ?0 }", fields="{'pending' : 1}")
    List<String> findPendingByEmailId(String emailId);
    @Query(value="{ '_id' : ?0 }",fields="{ 'requested' : 1 }")
    List<String> findRequestedByEmailId(String emailId);
    @Query(value="{ '_id' : ?0 }",fields="{'blocked' : 1 }")
    List<String> findBlockedByEmailId(String emailId);
    @Query(value="{ '_id' : ?0 }")
    Friends findByEmailIdinFriends(String emailId);
}

//fields = "{ '_id': 0, 'user.$id':1 }"