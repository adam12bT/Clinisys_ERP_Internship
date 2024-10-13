package com.csys.template.caisse.factory;

import com.csys.template.caisse.domain.User;
import com.csys.template.caisse.dto.UserDTO;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class UserFactory {
  public static UserDTO userToUserDTO(User user) {
    UserDTO userDTO=new UserDTO();
    userDTO.setUsername(user.getUsername());
    userDTO.setPassword(user.getPassword());
    userDTO.setDescription(user.getDescription());
    userDTO.setMvtConsigneList(user.getMvtConsigneList());
    userDTO.setMvtConsigneList1(user.getMvtConsigneList1());
    return userDTO;
  }

  public static User userDTOToUser(UserDTO userDTO) {
    User user=new User();
    user.setUsername(userDTO.getUsername());
    user.setPassword(userDTO.getPassword());
    user.setDescription(userDTO.getDescription());
    user.setMvtConsigneList(userDTO.getMvtConsigneList());
    user.setMvtConsigneList1(userDTO.getMvtConsigneList1());
    return user;
  }

  public static Collection<UserDTO> userToUserDTOs(Collection<User> users) {
    List<UserDTO> usersDTO=new ArrayList<>();
    users.forEach(x -> {
      usersDTO.add(userToUserDTO(x));
    } );
    return usersDTO;
  }
}

