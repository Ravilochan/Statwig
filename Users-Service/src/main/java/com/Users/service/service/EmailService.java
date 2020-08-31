package com.Users.service.service;

import com.Users.service.dao.ConfirmDao;
import com.Users.service.dao.UserDao;
import com.Users.service.model.Confirmation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service("emailSenderService")
public class EmailService implements  EmailServ{

    private JavaMailSender javaMailSender;

    @Autowired
    ConfirmDao conf;

    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Async
    public void sendEmail(SimpleMailMessage email) {
        javaMailSender.send(email);
    }

    public Confirmation findByTokenUsername(String confirmationToken) {
        return conf.findByTokenUsername(confirmationToken);
    }

    public String findByToken(String confirmationToken) {
        return conf.findByToken(confirmationToken);
    }

    public void createRegisterUser(Confirmation user)
    {
        conf.save(user);
    }
}