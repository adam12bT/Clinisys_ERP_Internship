package com.csys.template.caisse.dto;

import com.csys.template.caisse.domain.Client;
import com.csys.template.caisse.domain.Objet;
import com.csys.template.caisse.domain.User;
import java.lang.Boolean;
import java.lang.Long;
import java.lang.String;
import java.time.LocalDateTime;
import java.util.Date;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class MvtConsigneDTO {
 
  private Long id;

  @Size(
      min = 0,
      max = 250
  )
  private String autreFormation;

  private LocalDateTime dateEntree;

  private LocalDateTime dateSortie;

  private Boolean etat;

  private ClientDTO clientDTO;

  private ObjetDTO objetDTO;

  private UserDTO userDTO;

  private UserDTO userDTO1;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getAutreFormation() {
    return autreFormation;
  }

  public void setAutreFormation(String autreFormation) {
    this.autreFormation = autreFormation;
  }

    public LocalDateTime getDateEntree() {
        return dateEntree;
    }

    public void setDateEntree(LocalDateTime dateEntree) {
        this.dateEntree = dateEntree;
    }

    public LocalDateTime getDateSortie() {
        return dateSortie;
    }

    public void setDateSortie(LocalDateTime dateSortie) {
        this.dateSortie = dateSortie;
    }


  public Boolean getEtat() {
    return etat;
  }

  public void setEtat(Boolean etat) {
    this.etat = etat;
  }

    public ClientDTO getClientDTO() {
        return clientDTO;
    }

    public void setClientDTO(ClientDTO clientDTO) {
        this.clientDTO = clientDTO;
    }

    public ObjetDTO getObjetDTO() {
        return objetDTO;
    }

    public void setObjetDTO(ObjetDTO objetDTO) {
        this.objetDTO = objetDTO;
    }

    public UserDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    public UserDTO getUserDTO1() {
        return userDTO1;
    }

    public void setUserDTO1(UserDTO userDTO1) {
        this.userDTO1 = userDTO1;
    }

   


}

