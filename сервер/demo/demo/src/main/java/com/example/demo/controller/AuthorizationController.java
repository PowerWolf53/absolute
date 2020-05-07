package com.example.demo.controller;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.repository.model.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping(value = "api/absolute/auth", produces = APPLICATION_JSON_VALUE)
public class AuthorizationController {

    @Autowired
    private UserService userService;

    @PostMapping(value = "/sign_up")
    public void signUp(@RequestBody User user){
        userService.signUp(user);
    }

    @PostMapping(value = "/sign_in")
    public void signIn(@RequestBody User user){
         userService.signIn(user);
    }
}
