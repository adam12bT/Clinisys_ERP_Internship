package com.csys.template.caisse.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.lang.Long;
import java.lang.String;
import java.time.LocalDateTime;
import java.util.List;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class ObjetDTO {
  private Long code;

  @Size(
      min = 0,
      max = 250
  )
  private String lilelle;

  private LocalDateTime dateCreation;

  @NotNull
  @Size(
      min = 1,
      max = 50
  )
  private String userCreation;

  private List mvtConsigneList;

  public Long getCode() {
    return code;
  }

  public void setCode(Long code) {
    this.code = code;
  }

  public String getLilelle() {
    return lilelle;
  }

  public void setLilelle(String lilelle) {
    this.lilelle = lilelle;
  }

  public LocalDateTime getDateCreation() {
    return dateCreation;
  }

  public void setDateCreation(LocalDateTime dateCreation) {
    this.dateCreation = dateCreation;
  }

  public String getUserCreation() {
    return userCreation;
  }

  public void setUserCreation(String userCreation) {
    this.userCreation = userCreation;
  }

  public List getMvtConsigneList() {
    return mvtConsigneList;
  }

  public void setMvtConsigneList(List mvtConsigneList) {
    this.mvtConsigneList = mvtConsigneList;
  }

}

