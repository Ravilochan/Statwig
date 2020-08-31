package com.Users.service.service;

import com.Users.service.dao.ActivityDao;
import com.Users.service.model.Activity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityServiceImpl implements  ActivityService{

    @Autowired
    ActivityDao activityDao;

    @Override
    public void postVisitCount(Activity activity) {
        activityDao.save(activity);
    }

    @Override
    public Activity findByIdeaHeadline(String headline){
        return activityDao.findByIdeaHeadline(headline);
    }



}
