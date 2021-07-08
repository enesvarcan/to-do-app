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

import java.io.PushbackReader;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;

@RestController
@RequestMapping("/")
public class GatewayController {

    @Autowired
    private GatewayService gatewayService;

    @Autowired
    private JwtUtil jwtUtility;



    @PostMapping("/login")
    public Object loginController(@RequestBody UserDetail user) throws URISyntaxException, JsonProcessingException {

        RestTemplate restTemplate = new RestTemplate();

        final String baseUrl = "http://localhost:9001/user/auth";
        URI uri = new URI(baseUrl);

        ResponseEntity<String> result = restTemplate.postForEntity(uri, user, String.class);
        HashMap map =
                new ObjectMapper().readValue(result.getBody(), HashMap.class);
        return map.get("jwt");
    }

    @GetMapping ("/todo/")
    public Object getAll() throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();

        final String baseUrl = "http://localhost:9001/user/getAll";
        URI uri = new URI(baseUrl);

        ResponseEntity<String> result = restTemplate.getForEntity(uri, String.class);

        return result;
    }

}