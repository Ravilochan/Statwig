package com.javasampleapproach.kafka.model;

import java.util.List;

public class Channel {
    String channelId;
    String channelName;

    public Channel(String channelId, String channelName)
    {
        this.channelId = channelId;
        this.channelName = channelName;
    }
    public Channel()
    {

    }

    public String getChannelId() {
        return channelId;
    }

    public void setChannelId(String channelId) {
        this.channelId = channelId;
    }

    public String getChannelName() {
        return channelName;
    }

    public void setChannelName(String channelName) {
        this.channelName = channelName;
    }

    public String toString(){
        String info = String.format("{ 'ChannelId': %s, 'ChannelName': %s, 'Participant':%s}", channelId, channelName);
        return info;
    }
}
