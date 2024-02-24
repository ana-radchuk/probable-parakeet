package com.example.registration.service;

import com.example.registration.entity.AppUser;
import com.example.registration.entity.AppUserRole;
import com.example.registration.entity.request.LoginRequest;
import com.example.registration.entity.request.RegistrationRequest;
import com.example.registration.email.EmailSender;
import com.example.registration.utility.EmailValidator;
import com.example.registration.token.ConfirmationToken;
import com.example.registration.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class LoginService {

    private final EmailValidator emailValidator;
    private final AppUserService appUserService;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailSender emailSender;
    private final BCryptPasswordEncoder passwordEncoder;

    public String register(RegistrationRequest request) {
//        boolean isValidEmail = emailValidator.test(request.getEmail());
//
//        if (!isValidEmail)
//            throw new IllegalStateException("Email not valid");

        String token = appUserService.createUser(
                new AppUser(
                        request.getFirstName(),
                        request.getLastName(),
                        request.getEmail(),
                        request.getPassword(),
                        AppUserRole.USER
                ));

        String link = "http://localhost:8080/api/v1/login/confirm?token=" + token;
//        emailSender.send(
//                request.getEmail(),
//                buildEmail(request.getFirstName(),
//                link));

        confirmToken(token);

        return token;
    }

    public String login(LoginRequest request) {
        AppUser user = (AppUser) appUserService.loadUserByUsername(request.getEmail());

        if (user != null) {
            if (request.getEmail().equalsIgnoreCase(user.getEmail()) &&
                passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return "Login successful";
            }
        }

        return "Login failed";
    }

    @Transactional
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("Token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("Email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Token expired");
        }

        confirmationTokenService.setConfirmedAt(token);
        appUserService.enableAppUser(confirmationToken.getAppUser().getEmail());

        return "Token confirmed";
    }
}
