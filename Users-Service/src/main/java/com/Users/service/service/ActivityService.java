package com.Users.service.service;


import com.Users.service.model.Activity;
import com.Users.service.model.Confirmation;
import com.Users.service.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;

public interface ActivityService {

    /**
     * Method to create new Billing in the db using mongo-db repository.
     * @param activity
     */
    public void postVisitCount(Activity activity);


    /**
     * Method to fetch Billing by id using mongo-db repository.
     * @param headline
     * @return
     */
    public Activity findByIdeaHeadline(String headline);
}