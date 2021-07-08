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

import java.util.List;
import java.util.stream.Collectors;

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

    @PostMapping("/createKullanici")
    public Kullanici adduser(@RequestBody Kullanici kullanici) {
        return userService.save(kullanici);
    }

    @DeleteMapping ("/deleteKullanici/{id}")
    public Kullanici adduser(@PathVariable Long id) {
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