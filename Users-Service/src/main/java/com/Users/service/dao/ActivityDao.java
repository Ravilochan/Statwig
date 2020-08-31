package com.Users.service.dao;

import com.Users.service.model.Activity;
import com.Users.service.model.Friends;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public
interface ActivityDao extends CrudRepository<Activity, String> {

    @Query(value="{ 'idea_headline' : ?0 }")
    Activity findByIdeaHeadline(String headline);

}
