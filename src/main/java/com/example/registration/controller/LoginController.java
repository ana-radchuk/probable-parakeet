package com.example.registration.controller;

import com.example.registration.entity.request.LoginRequest;
import com.example.registration.entity.request.RegistrationRequest;
import com.example.registration.service.LoginService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@AllArgsConstructor
@RequestMapping(path = "api/v1")
public class LoginController {

    private final LoginService loginService;

    @PostMapping(path="/register")
    public String register(@RequestBody RegistrationRequest request) {
        return loginService.register(request);
    }
    @PostMapping(path="/login")
    public String login(@RequestBody LoginRequest request) {
        return loginService.login(request);
    }

    @GetMapping(path = "/confirm")
    public String confirm(@RequestParam("token") String token) {
        return loginService.confirmToken(token);
    }
}
