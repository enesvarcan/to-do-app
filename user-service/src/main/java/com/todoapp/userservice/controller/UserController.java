package com.todoapp.userservice.controller;

import com.todoapp.userservice.entities.Kullanici;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.todoapp.userservice.repository.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/createKullanici")
    public Kullanici adduser(@RequestBody Kullanici user) {
        return userRepository.save(user);
    }

    @GetMapping("/getAll")
    public List<Kullanici> getAllProduct () {
        return userRepository.findAll();
    }

    @GetMapping("/getNotifKullanicis")
    public List<Kullanici> getNotifKullanicis () {
        List<Kullanici> users= userRepository.findAll();

        return users.stream().filter(p -> p.isNotif_allow()).collect(Collectors.toList());
    }
}