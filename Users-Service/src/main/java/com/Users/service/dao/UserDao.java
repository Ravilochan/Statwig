package com.Users.service.dao;

import com.Users.service.model.Confirmation;
import com.Users.service.model.User;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public
interface UserDao extends CrudRepository<User, String> {

    @Query("{ 'username' : ?0 }")
    User findByUsername(String username);

    @Query("{ 'emailId' : ?0 }")
    User findByEmailId(String emailId);

    @Query("{ 'profilePic' : ?0 }")
    User findByImageId(String title);
}
