package com.Users.service.model;

public class Preference {
    String prefId;
    String prefName;

    public Preference(String prefId, String prefName){
        this.prefId = prefId;
        this.prefName = prefName;
    }

    public Preference(){

    }

    public String getPrefId() {
        return prefId;
    }

    public void setPrefId(String prefId) {
        this.prefId = prefId;
    }

    public String getPrefName() {
        return prefName;
    }

    public void setPrefName(String prefName) {
        this.prefName = prefName;
    }
}
