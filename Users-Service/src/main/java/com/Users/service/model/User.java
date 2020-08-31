package com.Users.service.model;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")
public class User {
    @Id
    public String emailId;
    public String username;
    public String password;
    public String firstName;
    public String lastName;
    public String dob;
    List<Preference> li;
    public boolean enabled;
    public String aboutME;
    public Binary profilePic;
    public String title;
    public String contact;
    public String language;
    public String country;
    public String homeTown;
    public String gender;
    public String state;

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getHomeTown() {
        return homeTown;
    }

    public void setHomeTown(String homeTown) {
        this.homeTown = homeTown;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Binary getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(Binary profilePic) {
        this.profilePic = profilePic;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public String getAboutME() {
        return aboutME;
    }

    public void setAboutME(String aboutME) {
        this.aboutME = aboutME;
    }

    public User(String emailId, String username, String password, String firstName, String lastName, String dob, List<Preference> li, Boolean
                enabled, String aboutME, Binary profilePic, String title, String gender, String contact, String language, String homeTown, String country, String state) {
        this.emailId = emailId;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.li = li;
        this.enabled=enabled;
        this.aboutME = aboutME;
        this.title = title;
        this.profilePic = profilePic;
        this.gender = gender;
        this.contact = contact;
        this.country = country;
        this.language = language;
        this.homeTown = homeTown;
        this.state = state;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public List<Preference> getLi() {
        return li;
    }

    public void setLi(List<Preference> li) {
        this.li = li;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}