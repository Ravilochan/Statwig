package com.javasampleapproach.kafka.controllers;

import com.datastax.driver.core.*;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import com.javasampleapproach.kafka.model.PrivateChannel;
import com.javasampleapproach.kafka.model.User;
//import com.sun.tools.classfile.Synthetic_attribute;
import org.json.JSONArray;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManagerFactory;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.security.KeyStore;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

@RestController
@RequestMapping("/api")
public class SpartanRestController {

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

    // User Sign up
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping(path = "/users/signup")
    public ResponseEntity<?> userSignup(@RequestBody User newuser) {
        User newObj = new User(newuser.getEmailId(), newuser.getUserId(), newuser.getFirstName(), newuser.getLastName(), newuser.getPassword(), newuser.getImageUrl());
        try {
            String Str = "INSERT INTO pingme.user(emailid, userid, firstname, avatar, lastname, password) values('" + newuser.getEmailId().toString() + "' , '" + newuser.getUserId().toString() + "','" + newuser.getFirstName().toString() + "','" + newuser.getImageUrl().toString() + "','" + newuser.getLastName().toString() + "','" + newuser.getPassword().toString() + "');";
            System.out.println("Query = " + Str);
            session.execute(Str);
            Str = "Select * from pingme.user where emailId= '" + newuser.getEmailId() + "' and password= '" + newuser.getPassword() + "' ALLOW FILTERING;";
            ObjectMapper mapper = new ObjectMapper();
            SimpleModule module = new SimpleModule();
            module.addSerializer(ResultSet.class, new ResultSetSerializer());
            mapper.registerModule(module);

            ResultSet result = session.execute(Str);
            String res = result.toString();
            String json = mapper.writeValueAsString(result);
            System.out.println(json);

            if (res.contains("exhausted: false"))
                return new ResponseEntity<>(json, null, HttpStatus.OK);
            else
                return new ResponseEntity<>("not Success", null, HttpStatus.INTERNAL_SERVER_ERROR);

        } catch (Exception e) {
            return new ResponseEntity<>("not Success", null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // User Login
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping(path = "/users/login")
    public ResponseEntity<?> userLogin(@RequestBody User user) throws JsonProcessingException {
        //  User newObj = new User(user.getUserId(), user.getPassword());
        String Str = "Select * from pingme.user where emailId= '" + user.getEmailId() + "' and password= '" + user.getPassword() + "' ALLOW FILTERING;";
        // String Str=  "INSERT INTO pingme.user(emailid, userid, firstname, imageurl, lastname, password) values('"+ newuser.getEmailId().toString() + "' , '" + newuser.getUserId().toString() + "','" + newuser.getFirstName().toString() + "','" + newuser.getImageUrl().toString() + "','" + newuser.getLastName().toString() + "','" + newuser.getPassword().toString() + "');";
        System.out.println("Query = " + Str);


        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(ResultSet.class, new ResultSetSerializer());
        mapper.registerModule(module);

        ResultSet result = session.execute(Str);
        String res = result.toString();
        String json = mapper.writeValueAsString(result);
        System.out.println(json);

        if (res.contains("exhausted: false"))
            return new ResponseEntity<>(json, null, HttpStatus.OK);
        else
            return new ResponseEntity<>("not Success", null, HttpStatus.INTERNAL_SERVER_ERROR);

    }



    //Get all users
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping(path = "/users/getallusers")
    public ResponseEntity<?> getAllUsers() throws JsonProcessingException {
        //  User newObj = new User(user.getUserId(), user.getPassword());
        String q = "Select * from pingme.user;";
       /* ResultSet res = session.execute(q);
        System.out.println("Query = " + q);
        List<Row> li = res.all();
        List<String> x = new ArrayList<>();
        for(Row row: li)
        {
            String str = row.toString();
            str = str.substring(0, str.length()-1);
            x.add(str.substring(4));
            System.out.println(row.toString());
        }
        String jsonText =  new Gson().toJson(x);

        return new ResponseEntity<>(jsonText, null, HttpStatus.OK);*/

        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(ResultSet.class, new ResultSetSerializer());
        mapper.registerModule(module);

        ResultSet result = session.execute(q);
        String json = mapper.writeValueAsString(result);
        System.out.println(json);
        return new ResponseEntity<>(json, null, HttpStatus.OK);
    }

    //Get all messages
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @RequestMapping(value = "/getmessages", method = RequestMethod.GET)
    public ResponseEntity<?> getMessages(@RequestParam("channel") String ChannelName) throws JsonProcessingException {
        //  User newObj = new User(user.getUserId(), user.getPassword());
        String q = "Select sender, messagecontent, timestamp, avatar  from collaborato.channelmessages where channelname = '" + ChannelName + "' ALLOW FILTERING;";
        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(ResultSet.class, new ResultSetSerializer());
        mapper.registerModule(module);

        ResultSet result = session.execute(q);
        String json = mapper.writeValueAsString(result);
        System.out.println(json);
        return new ResponseEntity<>(json, null, HttpStatus.OK);
    }

    //Get all channels
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @RequestMapping(value = "/getchannels", method = RequestMethod.GET)
    public ResponseEntity<?> getChannels() throws JsonProcessingException {

        String q = "Select * from collaborato.channel;";
        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(ResultSet.class, new ResultSetSerializer());
        mapper.registerModule(module);

        ResultSet result = session.execute(q);
        String json = mapper.writeValueAsString(result);
        System.out.println(json);
        return new ResponseEntity<>(json, null, HttpStatus.OK);
    }

    //Get all direct messages
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @RequestMapping(value = "/getdm", method = RequestMethod.GET)
    public ResponseEntity<?> getDirectMessage(@RequestParam("sender") String Sender, @RequestParam("receiver") String Receiver) throws JsonProcessingException {
        //  User newObj = new User(user.getUserId(), user.getPassword());
        String q = "Select sender, receiver, messagecontent, avatar, timestamp from collaborato.messages where sender = '" + Sender + "'  and receiver = '" + Receiver + "' ALLOW FILTERING;";
        String x = "Select  sender, receiver,messagecontent, avatar, timestamp from collaborato.messages where sender = '" + Receiver + "' and receiver = '" + Sender + "' ALLOW FILTERING;";

        System.out.println(q);
        System.out.println(x);
        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(ResultSet.class, new ResultSetSerializer());
        mapper.registerModule(module);
        ResultSet result = session.execute(q);
        String json = mapper.writeValueAsString(result);
        ResultSet result2 = session.execute(x);
        String json2 = mapper.writeValueAsString(result2);

        String res = "";

        if (json2.length() <= 2 && json.length() > 2 )
            return new ResponseEntity<>(json, null, HttpStatus.OK);
        if (json.length() <= 2 && json2.length() > 2)
            return new ResponseEntity<>(json2, null, HttpStatus.OK);
        if (json.length() > 2 && json2.length() > 2) {
            json = json.substring(0, json.length() - 1);
            json2 = json2.substring(1);
            System.out.println(json);
            System.out.println(json2);
            return new ResponseEntity<>(json + ',' + json2, null, HttpStatus.OK);
        }


            return new ResponseEntity<>("[]", null, HttpStatus.OK);

    }


    //Get all channels
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping(path = "/addchannel")
    public ResponseEntity<?> addChannel(@RequestParam("channelname") String Channel) throws JsonProcessingException {

        UUID uuid = UUID.randomUUID();
        String randomUUIDString = uuid.toString();
        String Str = "INSERT INTO collaborato.channel(channelid, channelname) values(" + randomUUIDString + " , '" + Channel +  "');";
        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(ResultSet.class, new ResultSetSerializer());
        mapper.registerModule(module);
        ResultSet result = session.execute(Str);
        String json = mapper.writeValueAsString(result);
        System.out.println(json);
        return new ResponseEntity<>(json, null, HttpStatus.OK);
    }


    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping(path = "/addtoprivate")
    public ResponseEntity<?> addToPrivate(@RequestBody PrivateChannel pvc) throws JsonProcessingException {

        //  User newObj = new User(user.getUserId(), user.getPassword());
      //  String Str = "Select * from collaborato.user where emailId= '" + user.getEmailId() + "' and password= '" + user.getPassword() + "' ALLOW FILTERING;";
        List<String> xyz = pvc.getParticipants();
        for(String s:xyz)
            System.out.println(s);
        String Str=  "INSERT INTO collaborato.privatechannels(channelname, channelid, users) values('"+ pvc.getChannelName() + "' , '" + UUID.randomUUID().toString() + "'," + pvc.getParticipants() + ");";
        System.out.println("CAME TO ADD PRIVATE CHANNEL = " + Str);
        session.execute(Str);
        Str = "Select * from collaborato.privatechannels ALLOW FILTERING;";
        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(ResultSet.class, new ResultSetSerializer());
        mapper.registerModule(module);

        ResultSet result = session.execute(Str);
        String res = result.toString();
        String json = mapper.writeValueAsString(result);
        System.out.println(json);

        if (res.contains("exhausted: false"))
            return new ResponseEntity<>(json, null, HttpStatus.OK);
        else
            return new ResponseEntity<>("not Success", null, HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping(path = "/addnewtoprivate")
    public ResponseEntity<?> addNewToPrivate(@RequestBody PrivateChannel pvc) throws JsonProcessingException {

        //  User newObj = new User(user.getUserId(), user.getPassword());
        //  String Str = "Select * from collaborato.user where emailId= '" + user.getEmailId() + "' and password= '" + user.getPassword() + "' ALLOW FILTERING;";

        String Str=  "UPDATE collaborato.privatechannels SET users = users + " + pvc.getParticipants() + " where channelName = '" + pvc.getChannelName()+"';";

        System.out.println("CAME TO ADD PRIVATE CHANNEL = " + Str);
        session.execute(Str);
        Str = "Select * from collaborato.privatechannels ALLOW FILTERING;";
        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(ResultSet.class, new ResultSetSerializer());
        mapper.registerModule(module);

        ResultSet result = session.execute(Str);
        String res = result.toString();
        String json = mapper.writeValueAsString(result);
        System.out.println(json);

        if (res.contains("exhausted: false"))
            return new ResponseEntity<>(json, null, HttpStatus.OK);
        else
            return new ResponseEntity<>("not Success", null, HttpStatus.INTERNAL_SERVER_ERROR);

    }


    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @RequestMapping(value = "/removefromprivate", method = RequestMethod.GET)
    public ResponseEntity<?> removeFromPrivate(@RequestParam("channel") String channel, @RequestParam("user") String user) throws JsonProcessingException {
        //  User newObj = new User(user.getUserId(), user.getPassword());
        String Str = "UPDATE collaborato.privatechannels set users = users - ['" + user + "'] WHERE channelName = '" + channel +"';";

        // String Str=  "INSERT INTO pingme.user(emailid, userid, firstname, imageurl, lastname, password) values('"+ newuser.getEmailId().toString() + "' , '" + newuser.getUserId().toString() + "','" + newuser.getFirstName().toString() + "','" + newuser.getImageUrl().toString() + "','" + newuser.getLastName().toString() + "','" + newuser.getPassword().toString() + "');";
        System.out.println("Query = " + Str);


        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(ResultSet.class, new ResultSetSerializer());
        mapper.registerModule(module);

        ResultSet result = session.execute(Str);
        String res = result.toString();
        String json = mapper.writeValueAsString(result);
        System.out.println(json);

        if (res.contains("exhausted: false"))
            return new ResponseEntity<>(json, null, HttpStatus.OK);
        else
            return new ResponseEntity<>("not Success", null, HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping(path = "/getprivatechannels")
    public ResponseEntity<?> GetAllPrivate(@RequestParam("user") String user) throws JsonProcessingException {
        //  User newObj = new User(user.getUserId(), user.getPassword());
        String Str = "Select * from collaborato.privatechannels WHERE users contains '"+ user +"' ALLOW FILTERING;";
        // String Str=  "INSERT INTO pingme.user(emailid, userid, firstname, imageurl, lastname, password) values('"+ newuser.getEmailId().toString() + "' , '" + newuser.getUserId().toString() + "','" + newuser.getFirstName().toString() + "','" + newuser.getImageUrl().toString() + "','" + newuser.getLastName().toString() + "','" + newuser.getPassword().toString() + "');";
        System.out.println("Query = " + Str);

        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(ResultSet.class, new ResultSetSerializer());
        mapper.registerModule(module);

        ResultSet result = session.execute(Str);
        String res = result.toString();
        String json = mapper.writeValueAsString(result);
        System.out.println(json);

        if (res.contains("exhausted: false"))
            return new ResponseEntity<>(json, null, HttpStatus.OK);
        else
            return new ResponseEntity<>("not Success", null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping(path = "/getaprivatechannel")
    public ResponseEntity<?> GetPrivateChannel(@RequestParam("channelName") String channel) throws JsonProcessingException {
        //  User newObj = new User(user.getUserId(), user.getPassword());
        String Str = "Select * from collaborato.privatechannels WHERE channelname = '"+ channel +"' ALLOW FILTERING;";
        // String Str=  "INSERT INTO pingme.user(emailid, userid, firstname, imageurl, lastname, password) values('"+ newuser.getEmailId().toString() + "' , '" + newuser.getUserId().toString() + "','" + newuser.getFirstName().toString() + "','" + newuser.getImageUrl().toString() + "','" + newuser.getLastName().toString() + "','" + newuser.getPassword().toString() + "');";
        System.out.println("Query = " + Str);

        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(ResultSet.class, new ResultSetSerializer());
        mapper.registerModule(module);

        ResultSet result = session.execute(Str);
        String res = result.toString();
        String json = mapper.writeValueAsString(result);
        System.out.println(json);

        if (res.contains("exhausted: false"))
            return new ResponseEntity<>(json, null, HttpStatus.OK);
        else
            return new ResponseEntity<>("not Success", null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
