package com.Users.service.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.UnknownHostException;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.StreamSupport;

import com.Users.service.dao.ActivityDao;
import com.Users.service.dao.ConfirmDao;
import com.Users.service.dao.UserDao;
import com.Users.service.model.*;
import com.Users.service.service.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.mongodb.MongoException;
//import com.sun.corba.se.spi.activation.ActivatorOperations;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
//import jdk.internal.cmm.SystemResourcePressureImpl;
import org.omg.DynamicAny.DynAnyOperations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
//import sun.jvm.hotspot.memory.FreeChunk;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value= "/api")
public class UserController{

    @Autowired
    UserService serv;
    @Autowired
    EmailServ conf;
    @Autowired
    UserDao dao;
    @Autowired
    private EmailService emailSenderService;
    @Autowired
    FriendsService frnd;
    @Autowired
    ActivityService act;
    @Autowired
    ActivityDao activitydao;


    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private static int workload = 12;

    public static String hashPassword(String password_plaintext) {
        String salt = BCrypt.gensalt(workload);
        String hashed_password = BCrypt.hashpw(password_plaintext, salt);

        return(hashed_password);
    }

    public static boolean checkPassword(String password_plaintext, String stored_hash) {
        boolean password_verified = false;

        if(null == stored_hash || !stored_hash.startsWith("$2a$"))
            throw new IllegalArgumentException("Invalid hash provided for comparison");

        password_verified = BCrypt.checkpw(password_plaintext, stored_hash);
        System.out.println("PASS VERI" + password_verified);

        return(password_verified);
    }

    /**
     * Method to save Users in the db.
     * @param user
     * @return
     */
    @JsonProperty("user")
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    @PostMapping(value= "/signup")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity create(@RequestBody User user) throws UnsupportedEncodingException {
        System.out.println("CAME HERE");
        Optional<User> usernameExists = Optional.ofNullable(serv.findByUserName(user.getUsername()));
        Optional<User> emailExists = Optional.ofNullable(serv.findByEmailId(user.getEmailId()));
        if(usernameExists.isPresent() || emailExists.isPresent())
            return new ResponseEntity("User Creation Failed",HttpStatus.BAD_REQUEST);


        String computed_hash = hashPassword(user.getPassword());
        user.setPassword(computed_hash);

        serv.createUser(user);
        Date date = Date.from(ZonedDateTime.now().plusMinutes(1000).toInstant());
        String jwt = Jwts.builder()
                .setSubject("users")
                .setExpiration(date)
                .claim("name",user.getEmailId())
                .claim("scope", user.getEmailId())
                .signWith(SignatureAlgorithm.HS256,"secret".getBytes("UTF-8"))
                .compact();
        System.out.println(jwt + " - " + HttpStatus.CREATED);

        Confirmation confirmationToken = new Confirmation(user);
       // serv.sendEmail(user);

        conf.createRegisterUser(confirmationToken);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getEmailId());
        mailMessage.setSubject("Complete Registration!");
        mailMessage.setFrom("collaborato@gmail.com");
        mailMessage.setText("To confirm your account, please click here : "
                +"http://localhost:8102/api/confirm?token="+confirmationToken.getToken());
        emailSenderService.sendEmail(mailMessage);

        return new ResponseEntity(new String[]{user.getUsername(),jwt,confirmationToken.getToken()},HttpStatus.CREATED);
    }

    /**
     * Method to fetch all Users from the db.
     * @return
     */
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping(value= "/getusers")
    public Collection<User> getAll() {
        System.out.println("HERE");
        logger.debug("Getting all Users");
        return serv.getAllUsers();
    }

    /**
     * Method to fetch User by id.
     * @param username
     * @return
     */
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping(value= "/get/{username}")
    public User getById(@PathVariable(value= "username") String username) {
        logger.debug("Getting user with user-Id= {}.", username);
        Optional<User> usernameExists = Optional.ofNullable(serv.findByUserName(username));
        if(!usernameExists.isPresent()){
            return null;
        }
            return serv.findByUserName(username);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping(value = "/image-upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity uploadImage(@RequestParam("title") String title,@RequestParam("username") String username,
    @RequestBody MultipartFile image) throws IOException {
        System.out.println("Came to login"+username);
        Optional<User> usernameExists = Optional.ofNullable(serv.findByUserName(username));
        User u;
        System.out.println("CAME HERE"+usernameExists.isPresent());
        if(usernameExists.isPresent()) {
            //check if the password is correct
            u = serv.findByUserName(username);
            System.out.println("FOUND");
            u.setTitle(title);
            System.out.println(image);
            u.setProfilePic(new Binary(BsonBinarySubType.BINARY, image.getBytes()));
            serv.updateAccount(u);
        }
        return new ResponseEntity("Image Uploaded", HttpStatus.OK);
    }





    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping(value = "/editProfile")
    @JsonDeserialize
    public ResponseEntity editProfile(@RequestBody User user) throws IOException {
//        String jwt = token;
//        Jws<Claims> claims = Jwts.parser().setSigningKey("secret".getBytes("UTF-8")).parseClaimsJws(jwt);
//        String scope = (String) claims.getBody().get("scope");
//        if (!scope.equals(user.getEmailId()))
//            return new ResponseEntity(HttpStatus.BAD_REQUEST);
//        else {
    		System.out.print(user);
            Optional<User> usernameExists = Optional.ofNullable(serv.findByUserName(user.getUsername()));
            User u;
            if (usernameExists.isPresent()) {
                System.out.println("LPL");
                System.out.println("LPL"+user.toString());
                //check if the password is correct
                u = serv.findByUserName(user.getUsername());
                u.setGender(user.getGender());
                u.setAboutME(user.getAboutME());
                u.setContact(user.getContact());
                u.setCountry(user.getCountry());
                u.setState(user.getState());
                u.setHomeTown(user.getHomeTown());
                u.setLi(user.getLi());
                serv.updateAccount(u);
            }
            return new ResponseEntity(serv.findByUserName(user.getUsername()), HttpStatus.OK);
      //  }
    }


    /**
     * Method to update User by id.
     * @param username
     //* @param user
     * @return
     */
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping(value= "/update/{username}")
    public ResponseEntity update(@RequestHeader("authorization") String token,@PathVariable(value="username") String username, @RequestBody User user) throws UnsupportedEncodingException {
        String jwt = token;
        Jws<Claims> claims = Jwts.parser().setSigningKey("secret".getBytes("UTF-8")).parseClaimsJws(jwt);
        String scope = (String) claims.getBody().get("scope");
        System.out.println("SCOPE ="+scope + " - " + user.getEmailId());
        if (!scope.equals(user.getEmailId()))
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        else {
            Optional<User> usernameExists = Optional.ofNullable(serv.findByUserName(username));
            if (!usernameExists.isPresent()) {
                return new ResponseEntity("User not found", HttpStatus.BAD_REQUEST);
            }
            User userOne = serv.findByUserName(username);
            if(user.getPassword()!=null)
                userOne.setPassword(user.getPassword());
            serv.updateAccount(userOne);
            System.out.println("SENDING RESPONSE");
            return new ResponseEntity("User Updated", HttpStatus.OK);
        }
    }

    /**
     * Method to login.
     * @param user
     * @return
     */
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping(value= "/login")
    public ResponseEntity signin(@RequestBody Login user) throws UnsupportedEncodingException {
        System.out.println("Came to login");
        Optional<User> usernameExists = Optional.ofNullable(serv.findByEmailId(user.getEmailId()));
        User u;
        System.out.println("CAME HERE");
        if(usernameExists.isPresent()){
            //check if the password is correct
            u = serv.findByEmailId(user.getEmailId());
            System.out.println(user.getPassword()+" - "+u.getPassword());
            if(checkPassword(user.getPassword(), u.getPassword())==false)
                return new ResponseEntity("Username or Password is incorrect",HttpStatus.BAD_REQUEST);

            Date date = Date.from(ZonedDateTime.now().plusMinutes(1000).toInstant());
            String jwt = Jwts.builder()
                    .setSubject("users")
                    .setExpiration(date)
                    .claim("name",user.getEmailId())
                    .claim("scope", user.getEmailId())
                    .signWith(SignatureAlgorithm.HS256,"secret".getBytes("UTF-8"))
                    .compact();
            return new ResponseEntity(new String[]{u.getUsername(),jwt},HttpStatus.OK);
        }
        else{
            return new ResponseEntity("User not found",HttpStatus.BAD_REQUEST);
        }
    }


    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping (value= "/confirm")
    public ResponseEntity confirmUserAccount(@RequestParam("token") String confirmationToken)
    {
        String token = conf.findByToken(confirmationToken);
        System.out.println("Came here");
        Confirmation userreg = conf.findByTokenUsername(confirmationToken);

        if(userreg.getToken() != null)
        {
            System.out.println("HERE IN USER =" + userreg.getUsername());
            User user = serv.findByUserName(userreg.getUsername());
            //System.out.println("HERE IN USER =" + user.getUsername());
            user.setEnabled(true);
            serv.updateAccount(user);
            String body =
                    "<HTML><body><p> Congratulations! Your account has been verified </p> <br></br><a href=\"http://localhost:3000/login\">Click on the link to go back to the platform</a></body></HTML>";
            return new ResponseEntity(body,HttpStatus.OK);
        }
            return new ResponseEntity("Account Could not be verified",HttpStatus.FAILED_DEPENDENCY);
    }// getters and setters


    /**
     * Method to login.
     * @param friends
     * @return
     */
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping(value= "/sendRequest")
    public ResponseEntity sendRequest(@RequestBody FriendRequest friends) throws UnsupportedEncodingException {
        //check if the password is correct
//        List<String> f1 = frnd.findFriendsByEmailId(friends.getFromEmailId());
//        List<String> p1 = frnd.findPendingByEmailId(friends.getFromEmailId());
//        List<String> b1 = frnd.findBlockedByEmailId(friends.getFromEmailId());
//        List<String> f2 = frnd.findFriendsByEmailId(friends.getToEmailId());
//        List<String> r2 = frnd.findRequestedByEmailId(friends.getToEmailId());
//
//        List<String> b2 = frnd.findBlockedByEmailId(friends.getToEmailId());

        System.out.println(friends.getFromEmailId());
        System.out.println("-----------------------------");
        Optional<Friends> x1Exists = Optional.ofNullable(frnd.findByEmailIdinFriends(friends.getFromEmailId()));
        Optional<Friends> x2Exists = Optional.ofNullable(frnd.findByEmailIdinFriends(friends.getToEmailId()));
        if(x1Exists.isPresent()) {
            System.out.println(friends.getFromEmailId()+ " - is Present");
            Friends x1 = frnd.findByEmailIdinFriends(friends.getFromEmailId());
            List<String> r1 = x1.getRequested();
            r1.add(friends.getToEmailId());
            x1.setRequested(r1);
            frnd.updateFriends(x1);
        }
        if(x2Exists.isPresent()) {
            System.out.println(friends.getToEmailId()+ " - is Present");
            Friends x2 = frnd.findByEmailIdinFriends(friends.getToEmailId());
            List<String> p1 = x2.getPending();
            p1.add(friends.getFromEmailId());
            x2.setPending(p1);
            frnd.updateFriends(x2);
        }
        if(x1Exists.isPresent()==false)
        {
            System.out.println(friends.getFromEmailId()+ " - is NOT Present");
            Friends newx1 = new Friends(friends.getFromEmailId(),new ArrayList<String>(),new ArrayList<String>(), new ArrayList<String>(),new ArrayList<String>(),false);
            List<String> r1 = new ArrayList<>();
            r1.add(friends.getToEmailId());
            newx1.setRequested(r1);
            frnd.updateFriends(newx1);
        }
        if(x2Exists.isPresent()==false)
        {
            System.out.println(friends.getToEmailId()+ " - is NOT Present");
            Friends newx2 = new Friends(friends.getToEmailId(), new ArrayList<String>(),new ArrayList<String>(), new ArrayList<String>(),new ArrayList<String>(),false);
            List<String> p2 = new ArrayList<>();
            p2.add(friends.getFromEmailId());
            newx2.setPending(p2);
            frnd.updateFriends(newx2);
        }

        return new ResponseEntity("Request Sent",HttpStatus.ACCEPTED);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping (value= "/getSuggestions")
    public Collection<User> getSuggestions(@RequestParam("user") String user)
    {
        System.out.println("CAME HERE");
        Friends f = frnd.findByEmailIdinFriends(user);
            Collection<User> u =  serv.getAllUsers();
            Collection<User> finalResponse = new ArrayList<>();
            u.forEach((temp) -> {
                System.out.println(temp.getEmailId());
                System.out.println(user);
                if(temp.getEmailId()==null)
                    System.out.println(user);
                else if(f==null && !temp.getEmailId().equals(user)) {
                    System.out.println("Added");
                    finalResponse.add(temp);
                }
                else if(f==null && temp.getEmailId().equals(user))
                    System.out.println(user);
                else if(!temp.getEmailId().equals(user) && !f.getBlocked().contains(temp.getEmailId()) && !f.getRequested().contains(temp.getEmailId()) && !f.getFriends().contains(temp.getEmailId()) && !f.getPending().contains(temp.getEmailId())) {
                    finalResponse.add(temp);
                    System.out.println("Added");
                }

            });

            return finalResponse;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping (value= "/getRequests")
    public List<String> getRequests(@RequestParam("user") String user){
         return frnd.findPendingByEmailId(user);
    }


    /**
     * Method to login.
     * @param friends
     * @return
     */
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping(value= "/addFriend")
    public ResponseEntity addFriend(@RequestBody FriendRequest friends) throws UnsupportedEncodingException {
        Optional<Friends> x1Exists = Optional.ofNullable(frnd.findByEmailIdinFriends(friends.getFromEmailId()));
        Optional<Friends> x2Exists = Optional.ofNullable(frnd.findByEmailIdinFriends(friends.getToEmailId()));
        System.out.println(x1Exists.isPresent() +" = "+ x2Exists.isPresent() );
        if(x1Exists.isPresent()) {
            System.out.println(friends.getFromEmailId()+ " - is Present");
            Friends x1 = frnd.findByEmailIdinFriends(friends.getFromEmailId());
            List<String> r1 = x1.getPending();
            System.out.println("PEND LENGTH ="+r1.size());
            r1.remove(friends.getToEmailId());
            x1.setPending(r1);
            List<String> f1 = x1.getFriends();
            f1.add(friends.getToEmailId());
            x1.setFriends(f1);
            System.out.println("PEND LENGTH ="+r1.size());
            frnd.updateFriends(x1);
        }
        if(x2Exists.isPresent()) {
            System.out.println(friends.getToEmailId()+ " - is Present");
            Friends x2 = frnd.findByEmailIdinFriends(friends.getToEmailId());
            List<String> p1 = x2.getRequested();
            System.out.println("REQ LENGTH ="+p1.size());
            p1.remove(friends.getFromEmailId());
            x2.setRequested(p1);
            List<String> f1 = x2.getFriends();
            f1.add(friends.getFromEmailId());
            x2.setFriends(f1);
            frnd.updateFriends(x2);
        }
        if(x1Exists.isPresent()==false)
        {
            System.out.println(friends.getFromEmailId()+ " - is NOT Present");
            Friends newx1 = new Friends(friends.getFromEmailId(),new ArrayList<String>(),new ArrayList<String>(), new ArrayList<String>(),new ArrayList<String>(),false);
            List<String> r1 = new ArrayList<>();
            r1.add(friends.getToEmailId());
            newx1.setFriends(r1);
            frnd.updateFriends(newx1);
        }
        if(x2Exists.isPresent()==false)
        {
            System.out.println(friends.getToEmailId()+ " - is NOT Present");
            Friends newx2 = new Friends(friends.getToEmailId(), new ArrayList<String>(),new ArrayList<String>(), new ArrayList<String>(),new ArrayList<String>(),false);
            List<String> p2 = new ArrayList<>();
            p2.add(friends.getFromEmailId());
            newx2.setFriends(p2);
            frnd.updateFriends(newx2);
        }

        return new ResponseEntity("Request Sent",HttpStatus.ACCEPTED);

    }

    /**
     * Method to login.
     * @param friends
     * @return
     */
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping(value= "/blockFriend")
    public ResponseEntity blockFriend(@RequestBody FriendRequest friends) throws UnsupportedEncodingException {
        Optional<Friends> x1Exists = Optional.ofNullable(frnd.findByEmailIdinFriends(friends.getFromEmailId()));
        Optional<Friends> x2Exists = Optional.ofNullable(frnd.findByEmailIdinFriends(friends.getToEmailId()));
        System.out.println(x1Exists.isPresent() +" = "+ x2Exists.isPresent() );
        if(x1Exists.isPresent()) {
            System.out.println(friends.getFromEmailId()+ " - is Present");
            Friends x1 = frnd.findByEmailIdinFriends(friends.getFromEmailId());
            List<String> r1 = x1.getPending();
            System.out.println("PEND LENGTH ="+r1.size());
            r1.remove(friends.getToEmailId());
            x1.setPending(r1);
            List<String> f1 = x1.getBlocked();
            f1.add(friends.getToEmailId());
            x1.setBlocked(f1);
            System.out.println("PEND LENGTH ="+r1.size());
            frnd.updateFriends(x1);
        }
        if(x2Exists.isPresent()) {
            System.out.println(friends.getToEmailId()+ " - is Present");
            Friends x2 = frnd.findByEmailIdinFriends(friends.getToEmailId());
            List<String> p1 = x2.getRequested();
            System.out.println("REQ LENGTH ="+p1.size());
            p1.remove(friends.getFromEmailId());
            x2.setRequested(p1);
            frnd.updateFriends(x2);
        }
        if(x1Exists.isPresent()==false)
        {
            System.out.println(friends.getFromEmailId()+ " - is NOT Present");
            Friends newx1 = new Friends(friends.getFromEmailId(),new ArrayList<String>(),new ArrayList<String>(), new ArrayList<String>(),new ArrayList<String>(),false);
            frnd.updateFriends(newx1);
        }
        if(x2Exists.isPresent()==false)
        {
            System.out.println(friends.getToEmailId()+ " - is NOT Present");
            Friends newx2 = new Friends(friends.getToEmailId(), new ArrayList<String>(),new ArrayList<String>(), new ArrayList<String>(),new ArrayList<String>(),false);
            frnd.updateFriends(newx2);
        }

        return new ResponseEntity("Request Sent",HttpStatus.ACCEPTED);

    }


    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping (value= "/getFriends")
    public List<String> getFriends(@RequestParam("user") String user){
        System.out.println("SENDING FRIENDS");
        return frnd.findFriendsByEmailId(user);
    }



//     * Method to login.
//     * @param user
//     * @return
//     */
//    @CrossOrigin(origins = "*", allowedHeaders = "*")
//    @PostMapping(value= "/login")
//    public ResponseEntity signin(@RequestBody User user) throws UnsupportedEncodingException {
//        Optional<User> usernameExists = Optional.ofNullable(serv.findByEmailId(user.getEmailId()));
//        User u;
//        System.out.println("CAME HERE");
//        if(usernameExists.isPresent()){
//            //check if the password is correct
//            u = serv.findByEmailId(user.getEmailId());
//            System.out.println(user.getPassword()+" - "+u.getPassword());
//            if(checkPassword(user.getPassword(), u.getPassword())==false)
//                return new ResponseEntity("Username or Password is incorrect",HttpStatus.BAD_REQUEST);
//
//            Date date = Date.from(ZonedDateTime.now().plusMinutes(1000).toInstant());
//            String jwt = Jwts.builder()
//                    .setSubject("users")
//                    .setExpiration(date)
//                    .claim("name",user.getEmailId())
//                    .claim("scope", user.getEmailId())
//                    .signWith(SignatureAlgorithm.HS256,"secret".getBytes("UTF-8"))
//                    .compact();
//            return new ResponseEntity(new String[]{u.getUsername(),jwt},HttpStatus.OK);
//        }
//        else{
//            return new ResponseEntity("User not found",HttpStatus.BAD_REQUEST);
//        }
//    }


    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping(value= "/postactivity")
    public ResponseEntity postActivity(@RequestBody Activity activity) throws UnsupportedEncodingException {
        Optional<Activity> idea_exists = Optional.ofNullable(act.findByIdeaHeadline(activity.getIdea_headline()));
        Activity a;
        System.out.println("IDEA HEADLINE = "+ activity.getIdea_headline());
        System.out.println("IDEA OWNER = "+ activity.getIdea_owner());
        System.out.println("IDEA COUNT = "+ activity.getVisitCount());
            //check if the password is correct
        if(idea_exists .isPresent()) {
            a = act.findByIdeaHeadline(activity.getIdea_headline());
            a.setVisitCount(activity.getVisitCount());
            act.postVisitCount(a);
        }
            return new ResponseEntity(HttpStatus.OK);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping (value= "/getactivity")
    public Activity getActivity(@RequestParam("headline") String headline,@RequestParam("owner") String owner ){
        Optional<Activity> idea_exists = Optional.ofNullable(act.findByIdeaHeadline(headline));


        if(idea_exists.isPresent()) {
            return act.findByIdeaHeadline(headline);
        }
        else
        {
            Activity a = new Activity(headline,owner,0);
            act.postVisitCount(a);
            return act.findByIdeaHeadline(headline);
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping (value= "/getallactivity")
    public ResponseEntity getActivity(){
        return new ResponseEntity( activitydao.findAll(), HttpStatus.OK);
    }
}