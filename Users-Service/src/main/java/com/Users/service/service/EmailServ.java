package com.Users.service.service;

import com.Users.service.model.Confirmation;
import com.Users.service.model.User;

import java.util.Collection;

public interface EmailServ {
    public Confirmation findByTokenUsername(String confirmationToken);

    public String findByToken(String confirmationToken);

    public void createRegisterUser(Confirmation user);
}