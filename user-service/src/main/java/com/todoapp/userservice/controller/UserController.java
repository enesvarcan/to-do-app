package com.todoapp.userservice.controller;

import com.todoapp.userservice.entities.Kullanici;
import com.todoapp.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

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