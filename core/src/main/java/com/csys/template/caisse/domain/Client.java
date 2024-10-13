/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.csys.template.caisse.domain;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author adamb
 */
@Entity
@Table(name = "client")
@NamedQueries({
    @NamedQuery(name = "Client.findAll", query = "SELECT c FROM Client c")})
public class Client implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "numDoss")
    private String numDoss;
    @Size(max = 40)
    @Column(name = "nomCli")
    private String nomCli;
    @Size(max = 40)
    @Column(name = "prenom")
    private String prenom;
    @Size(max = 3)
    @Column(name = "nation")
    private String nation;
    @Basic(optional = false)
    @NotNull
    @Column(name = "sex")
    private boolean sex;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "numdoss")
    private List<MvtConsigne> mvtConsigneList;

    public Client() {
    }

    public Client(String numDoss) {
        this.numDoss = numDoss;
    }

    public Client(String numDoss, boolean sex) {
        this.numDoss = numDoss;
        this.sex = sex;
    }

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

    public List<MvtConsigne> getMvtConsigneList() {
        return mvtConsigneList;
    }

    public void setMvtConsigneList(List<MvtConsigne> mvtConsigneList) {
        this.mvtConsigneList = mvtConsigneList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (numDoss != null ? numDoss.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Client)) {
            return false;
        }
        Client other = (Client) object;
        if ((this.numDoss == null && other.numDoss != null) || (this.numDoss != null && !this.numDoss.equals(other.numDoss))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.csys.template.caisse.domain.Client[ numDoss=" + numDoss + " ]";
    }
    
}
