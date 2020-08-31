package com.Users.service.dao;

import com.Users.service.model.Confirmation;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public
interface ConfirmDao extends CrudRepository<Confirmation, String> {

    @Query("{ 'token' : ?0 }")
    String findByToken(String confirmationToken);

    @Query("{ 'token' : ?0 }")
    Confirmation findByTokenUsername(String confirmationToken);
}


