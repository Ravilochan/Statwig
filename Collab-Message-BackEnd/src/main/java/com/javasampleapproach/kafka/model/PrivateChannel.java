package com.javasampleapproach.kafka.model;

import java.util.List;
import java.util.UUID;

public class PrivateChannel {

    String channelId;
    String channelName;
    List<String> participants;

    public PrivateChannel(String channelId, String channelName, List<String> participants, String addedBy)
    {
        this.channelId = UUID.randomUUID().toString();
        this.channelName = channelName;
        this.participants = participants;
    }
    public PrivateChannel()
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

    public List<String> getParticipants() {
        return participants;
    }

    public void setParticipants(List<String> participants) {
        this.participants = participants;
    }

    public String toString(){
        String info = String.format("{ 'ChannelId': %s, 'ChannelName': %s, 'Participant':%s}", channelId, channelName,participants);
        return info;
    }
}