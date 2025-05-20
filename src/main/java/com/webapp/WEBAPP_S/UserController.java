package com.webapp.WEBAPP_S;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.Optional;



@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/saveUser")
    public ResponseEntity<String> saveUser(@RequestBody User1 user) {
        logger.info("Saving user: {}", user); // Log the user object
        try {
            //  Perform validation here
            if (user == null || user.getName() == null || user.getName().trim().isEmpty() ||
                    user.getEmail() == null || user.getEmail().trim().isEmpty() ||
                    user.getPhone() == null || user.getPhone().trim().isEmpty()) {
                logger.error("Invalid user data: {}", user);
                return ResponseEntity.badRequest().body("Invalid user data: Name, email, and phone are required.");
            }
            if (!isValidEmail(user.getEmail()))
            {
                return ResponseEntity.badRequest().body("Invalid email format");
            }
            if (!isValidPhone(user.getPhone()))
            {
                return ResponseEntity.badRequest().body("Invalid phone format");
            }

            userRepository.save(user);
            logger.info("User saved successfully");
            return ResponseEntity.ok("User saved successfully");
        } catch (Exception e) {
            logger.error("Error saving user", e); // Log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving user: " + e.getMessage());
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<User1>> getUsers() {
        logger.info("Getting all users");
        List<User1> users = userRepository.findAll();
        logger.info("Retrieved users: {}", users);
        return ResponseEntity.ok(users);
    }
    private boolean isValidEmail(String email) {
        // Basic email validation regex
        return email.matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    }

    private boolean isValidPhone(String phone) {
        // Basic phone validation regex
        return phone.matches("^\\d{10}$");
    }
}
