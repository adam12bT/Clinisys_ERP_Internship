package com.csys.template.caisse.service;

import com.csys.template.caisse.domain.User;
import com.csys.template.caisse.dto.UserDTO;
import com.csys.template.caisse.factory.UserFactory;
import com.csys.template.caisse.repository.UserRepository;
import com.google.common.base.Preconditions;
import java.lang.String;
import java.util.Collection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing User.
 */
@Service
@Transactional
public class UserService {
  private final Logger log = LoggerFactory.getLogger(UserService.class);

  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository=userRepository;
  }

  /**
   * Save a userDTO.
   *
   * @param userDTO
   * @return the persisted entity
   */
  public UserDTO save(UserDTO userDTO) {
    log.debug("Request to save User: {}",userDTO);
    User user = UserFactory.userDTOToUser(userDTO);
    user = userRepository.save(user);
    UserDTO resultDTO = UserFactory.userToUserDTO(user);
    return resultDTO;
  }

  /**
   * Update a userDTO.
   *
   * @param userDTO
   * @return the updated entity
   */
  public UserDTO update(UserDTO userDTO) {
    log.debug("Request to update User: {}",userDTO);
    User inBase= userRepository.findById(userDTO.getUsername()).orElse(null);
    Preconditions.checkArgument(inBase != null, "user.NotFound");
    User user = UserFactory.userDTOToUser(userDTO);
    user = userRepository.save(user);
    UserDTO resultDTO = UserFactory.userToUserDTO(user);
    return resultDTO;
  }

  /**
   * Get one userDTO by id.
   *
   * @param id the id of the entity
   * @return the entity DTO
   */
  @Transactional(
      readOnly = true
  )
  public UserDTO findOne(String id) {
    log.debug("Request to get User: {}",id);
    User user= userRepository.findById(id).orElse(null);
    UserDTO dto = UserFactory.userToUserDTO(user);
    return dto;
  }

  /**
   * Get one user by id.
   *
   * @param id the id of the entity
   * @return the entity
   */
  @Transactional(
      readOnly = true
  )
  public User findUser(String id) {
    log.debug("Request to get User: {}",id);
    User user= userRepository.findById(id).orElse(null);
    return user;
  }

  /**
   * Get all the users.
   *
   * @return the the list of entities
   */
  @Transactional(
      readOnly = true
  )
  public Collection<UserDTO> findAll() {
    log.debug("Request to get All Users");
    Collection<User> result= userRepository.findAll();
    return UserFactory.userToUserDTOs(result);
  }

  /**
   * Delete user by id.
   *
   * @param id the id of the entity
   */
  public void delete(String id) {
    log.debug("Request to delete User: {}",id);
    userRepository.deleteById(id);
  }
}

