package com.example.registration.login;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/login")
@AllArgsConstructor
public class LoginController {

    private LoginService loginService;

    @PostMapping()
    public String register(@RequestBody RegistrationRequest request) {
        return loginService.register(request);
    }
}
