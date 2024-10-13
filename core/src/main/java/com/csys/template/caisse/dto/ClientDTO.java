package com.csys.template.caisse.dto;

import java.lang.String;
import java.util.List;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class ClientDTO {
  @NotNull
  @Size(
      min = 1,
      max = 50
  )
  private String numDoss;

  @Size(
      min = 0,
      max = 40
  )
  private String nomCli;

  @Size(
      min = 0,
      max = 40
  )
  private String prenom;

  @Size(
      min = 0,
      max = 3
  )
  private String nation;

  @NotNull
  private boolean sex;

  private List mvtConsigneList;

  public String getNumDoss() {
    return numDoss;
  }

  public void setNumDoss(String numDoss) {
    this.numDoss = numDoss;
  }

  public String getNomCli() {
    return nomCli;
  }

  public void setNomCli(String nomCli) {
    this.nomCli = nomCli;
  }

  public String getPrenom() {
    return prenom;
  }

  public void setPrenom(String prenom) {
    this.prenom = prenom;
  }

  public String getNation() {
    return nation;
  }

  public void setNation(String nation) {
    this.nation = nation;
  }

  public boolean getSex() {
    return sex;
  }

  public void setSex(boolean sex) {
    this.sex = sex;
  }

  public List getMvtConsigneList() {
    return mvtConsigneList;
  }

  public void setMvtConsigneList(List mvtConsigneList) {
    this.mvtConsigneList = mvtConsigneList;
  }
}

