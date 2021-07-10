package com.todoapp.gateway.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.todoapp.gateway.entities.UserDetail;
import com.todoapp.gateway.service.GatewayService;
import com.todoapp.gateway.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/")
public class GatewayController {

    @Autowired
    private GatewayService gatewayService;

    @Autowired
    private JwtUtil jwtUtility;

    private static final String TODO_SERVICE_URL = "http://192.168.1.33:8080";
    private static final String USER_SERVICE_URL = "http://localhost:9001";
    private static final String NOTIF_SERVICE_URL = "http://192.168.1.33:8081";

    ////// LOGIN
    @PostMapping("/login")
    public Object loginController(@RequestBody UserDetail user) throws URISyntaxException, JsonProcessingException {

        RestTemplate restTemplate = new RestTemplate();

        final String baseUrl = USER_SERVICE_URL+"/user/auth";
        URI uri = new URI(baseUrl);

        ResponseEntity<String> result = restTemplate.postForEntity(uri, user, String.class);
        HashMap map =
                new ObjectMapper().readValue(result.getBody(), HashMap.class);
        return map;
    }

    ////// --------------------------------------------------

    ////// USER SERVICE

    @PostMapping("/user/create")
    public Object createUser(@RequestBody Object user) throws URISyntaxException {

        RestTemplate restTemplate = new RestTemplate();

        final String baseUrl = USER_SERVICE_URL + "/user/create";
        URI uri = new URI(baseUrl);
        Object createdUser = restTemplate.postForEntity(uri, user, Object.class).getBody();

        final String notifurl = NOTIF_SERVICE_URL + "/newUserRegistered";
        URI notifuri = new URI(notifurl);

        ResponseEntity<String> result = restTemplate.postForEntity(notifuri, createdUser, String.class);
        return user;
    }

    ////// --------------------------------------------------


    ////// TO-DO SERVICE

    @GetMapping("/todo/user/{username}")
    public Object getUserTodos(@PathVariable String username) throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();

        final String baseUrl = TODO_SERVICE_URL + "/todo/user/" + username;
        URI uri = new URI(baseUrl);

        return restTemplate.getForEntity(uri, String.class).getBody();
    }

    @GetMapping(path = "/todo/{todoId}")
    public Object getTodo(@PathVariable String todoId) throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();

        final String baseUrl = TODO_SERVICE_URL + "/todo/" + todoId;
        URI uri = new URI(baseUrl);

        return restTemplate.getForEntity(uri, String.class).getBody();
    }

    @PostMapping(path = "/todo")
    public Object createTodo(@RequestBody Object todo) throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();

        final String baseUrl = TODO_SERVICE_URL + "/todo";
        URI uri = new URI(baseUrl);

        return restTemplate.postForEntity(uri, todo, Object.class).getBody();
    }

    @DeleteMapping(path = "/todo/{todoId}")
    public void deleteTodo(@PathVariable String todoId) throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();

        final String baseUrl = TODO_SERVICE_URL + "/todo/" + todoId;
        URI uri = new URI(baseUrl);
        restTemplate.delete(uri);

    }

    @PutMapping(path = "/todo/{todoId}")
    public void updateTodo(@PathVariable String todoId, @RequestBody Object todo) throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();

        final String baseUrl = TODO_SERVICE_URL + "/todo/" + todoId;
        URI uri = new URI(baseUrl);
        restTemplate.put(uri, todo);

    }

    @GetMapping(path = "/todo/user/{username}/dailyTodos")
    public Object getUserDailyTodos(@PathVariable String username) throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();

        final String baseUrl = TODO_SERVICE_URL + "/todo/user/" + username + "/dailyTodos";
        URI uri = new URI(baseUrl);

        return restTemplate.getForEntity(uri, String.class).getBody();
    }


    ////// --------------------------------------------------
}