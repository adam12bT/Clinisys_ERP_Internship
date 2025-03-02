package com.csys.template.caisse.web.rest;

import com.csys.template.caisse.domain.User;
import com.csys.template.caisse.dto.UserDTO;
import com.csys.template.caisse.factory.UserFactory;
import com.csys.template.caisse.service.UserService;
import com.csys.template.util.RestPreconditions;
import java.lang.String;
import java.lang.Void;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for managing User.
 */
@RestController
@RequestMapping("/api")
public class UserResource {
  private static final String ENTITY_NAME = "user";

  private final UserService userService;

  private final Logger log = LoggerFactory.getLogger(UserService.class);

  public UserResource(UserService userService) {
    this.userService=userService;
  }

  @PostMapping("/users")
  public ResponseEntity<UserDTO> createUser(@Valid @RequestBody UserDTO userDTO, BindingResult bindingResult) throws URISyntaxException, MethodArgumentNotValidException {
    log.debug("REST request to save User : {}", userDTO);
    if ( userDTO.getUsername() == null ||  userDTO.getUsername().isEmpty() ) {
      bindingResult.addError( new FieldError("UserDTO","username","POST method does not accepte "+ENTITY_NAME+" without code"));
      throw new MethodArgumentNotValidException(null, bindingResult);
    }
    if (bindingResult.hasErrors()) {
      throw new MethodArgumentNotValidException(null, bindingResult);
    }
    UserDTO result = userService.save(userDTO);
    return ResponseEntity.created( new URI("/api/users/"+ result.getUsername())).body(result);
  }

  @PutMapping("/users/{id}")
  public ResponseEntity<UserDTO> updateUser(@PathVariable String id, @Valid @RequestBody UserDTO userDTO) throws MethodArgumentNotValidException {
    log.debug("Request to update User: {}",id);
    userDTO.setUsername(id);
    UserDTO result =userService.update(userDTO);
    return ResponseEntity.ok().body(result);
  }

  @GetMapping("/users/{id}")
  public ResponseEntity<UserDTO> getUser(@PathVariable String id) {
    log.debug("Request to get User: {}",id);
    UserDTO dto = userService.findOne(id);
    RestPreconditions.checkFound(dto, "user.NotFound");
    return ResponseEntity.ok().body(dto);
  }


  @GetMapping("/users")
  public Collection<UserDTO> getAllUsers() {
    log.debug("Request to get all  Users : {}");
    return userService.findAll();
  }


  @DeleteMapping("/users/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable String id) {
    log.debug("Request to delete User: {}",id);
    userService.delete(id);
    return ResponseEntity.ok().build();
  }
}

