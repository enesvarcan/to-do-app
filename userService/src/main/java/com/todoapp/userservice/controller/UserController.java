package com.todoapp.userservice.controller;

import com.todoapp.userservice.entities.AuthenticationRequest;
import com.todoapp.userservice.entities.AuthenticationResponse;
import com.todoapp.userservice.entities.Kullanici;
import com.todoapp.userservice.service.UserService;
import com.todoapp.userservice.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "https://d8a612c1c808.ngrok.io/")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/auth")
    public AuthenticationResponse authenticate(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getUsername(),
                            authenticationRequest.getPassword()
                    )
            );
        }catch (BadCredentialsException e){
            throw new Exception("invalid credentials",e);
        }
        final UserDetails userDetails = userService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtUtil.generateToken(userDetails);

        return new AuthenticationResponse(jwt);
    }

    @PostMapping("/create")
    public Kullanici adduser(@RequestBody Kullanici user) throws URISyntaxException {
        RestTemplate restTemplate = new RestTemplate();

        final String baseUrl = "http://1c5f1f17e4a1.ngrok.io/newUserRegistered";
        URI uri = new URI(baseUrl);
        Map<Object, Object> map = new HashMap<>();
        map.put("username", user.getUsername());
        map.put("email", user.getEmail());
        map.put("name", user.getName());
        map.put("surname", user.getSurname());
        map.put("notifAllow", user.isNotif_allow());
        ResponseEntity<String> result = restTemplate.postForEntity(uri, map, String.class);
        return userService.save(user);
    }

    @DeleteMapping ("/delete/{id}")
    public Kullanici deleteUser(@PathVariable Long id) {
        Kullanici deletedKullanici = userService.getById(id);
        userService.deleteById(id);
        return deletedKullanici;
    }

    @GetMapping("/getAll")
    public List<Kullanici> getAllProduct () {
        return userService.findAll();
    }

    @GetMapping("/getNotifKullanicilar")
    public List<Kullanici> getNotifKullanicilar () {
        List<Kullanici> users= userService.findAll();
        return users.stream().filter(Kullanici::isNotif_allow).collect(Collectors.toList());
    }



}