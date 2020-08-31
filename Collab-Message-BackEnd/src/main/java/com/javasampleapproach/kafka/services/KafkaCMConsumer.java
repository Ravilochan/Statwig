package com.javasampleapproach.kafka.services;

import com.datastax.driver.core.*;
import com.javasampleapproach.kafka.model.ChannelMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;
import java.io.FileInputStream;
import java.security.KeyStore;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.UUID;

@Service
public class KafkaCMConsumer
{
    SSLOptions sslOptions;

    {
        try {
            sslOptions = loadCaCert("/Users/local/Downloads/ca.pem");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static SSLOptions loadCaCert(String caCertPath) throws Exception {
        CertificateFactory cf = CertificateFactory.getInstance("X.509");
        FileInputStream fis = null;
        X509Certificate caCert;
        try {
            fis = new FileInputStream(caCertPath);
            caCert = (X509Certificate) cf.generateCertificate(fis);
        } finally {
            if (fis != null) {
                fis.close();
            }
        }

        TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
        KeyStore ks = KeyStore.getInstance(KeyStore.getDefaultType());
        ks.load(null);
        ks.setCertificateEntry("caCert", caCert);
        tmf.init(ks);

        SSLContext sslContext = SSLContext.getInstance("TLS");
        sslContext.init(null, tmf.getTrustManagers(), null);
        return RemoteEndpointAwareJdkSSLOptions.builder().withSSLContext(sslContext).build();
    }


    Cluster cluster = Cluster.builder().addContactPoints("collaborato295b-sjsu-1dab.aivencloud.com").withPort(14881)
            .withSSL(sslOptions)
            .withAuthProvider(new PlainTextAuthProvider("avnadmin", "owlaf4yxx8p6c6z0"))
            .build();
    Session session = cluster.connect("collaborato");
    private static final Logger LOG = LoggerFactory.getLogger(ChannelMessage.class);
    @KafkaListener(topics="${jsa.kafka.topicCM}", group = "foo", containerFactory = "kafkaListenerContainerFactoryCM")
    //@Payload(required = false)
    public String processMessage(ChannelMessage channelPing) {
        System.out.println("Received Channel Message = " + channelPing);
        UUID uuidCh = UUID.randomUUID();   //ChannelId
        String randomUUIDStringCh = uuidCh.toString();
        UUID uuidM = UUID.randomUUID();   //MessageId
        String randomUUIDStringM = uuidM.toString();
        String Str=   "INSERT INTO collaborato.channelmessages (messageid, channelname, messagecontent, sender, timestamp, avatar) values("+ randomUUIDStringM + ",'" + channelPing.getChannelName().toString() + "','" + channelPing.getMessageContent().toString() + "','" + channelPing.getFrom().toString() + "','" + channelPing.getTimestamp().toString() +   "' , '" + "https://www.gravatar.com/avatar/94d093eda664addd6e450d7e98" +  "');";
        System.out.println("Query = " + Str);
        session.execute(Str);
        return "Channel Message send Successfully";
    }
}
