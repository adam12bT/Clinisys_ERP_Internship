/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.csys.template.caisse.domain;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author adamb
 */
@Entity
@Table(name = "MvtConsigne")
@NamedQueries({
    @NamedQuery(name = "MvtConsigne.findAll", query = "SELECT m FROM MvtConsigne m")})
public class MvtConsigne implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Size(max = 250)
    @Column(name = "autreFormation")
    private String autreFormation;
    @Column(name = "DateEntree")
    private LocalDateTime dateEntree;
    @Column(name = "dateSortie")
    private LocalDateTime dateSortie;
    @Column(name = "etat")
    private Boolean etat;
    @JoinColumn(name = "numdoss", referencedColumnName = "numDoss")
    @ManyToOne(optional = false)
    private Client numdoss;
    @JoinColumn(name = "codeObjet", referencedColumnName = "code")
    @ManyToOne(optional = false)
    private Objet codeObjet;
    @JoinColumn(name = "userEntree", referencedColumnName = "username")
    @ManyToOne(optional = false)
    private User userEntree;
    @JoinColumn(name = "userSortie", referencedColumnName = "username")
    @ManyToOne
    private User userSortie;

    @PrePersist
    public void prePersist() {
        this.dateEntree = LocalDateTime.now();
    }
    
    
    

    public MvtConsigne() {
    }

    public MvtConsigne(Long id) {
        this.id = id;
    }

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

    public Client getNumdoss() {
        return numdoss;
    }

    public void setNumdoss(Client numdoss) {
        this.numdoss = numdoss;
    }

    public Objet getCodeObjet() {
        return codeObjet;
    }

    public void setCodeObjet(Objet codeObjet) {
        this.codeObjet = codeObjet;
    }

    public User getUserEntree() {
        return userEntree;
    }

    public void setUserEntree(User userEntree) {
        this.userEntree = userEntree;
    }

    public User getUserSortie() {
        return userSortie;
    }

    public void setUserSortie(User userSortie) {
        this.userSortie = userSortie;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MvtConsigne)) {
            return false;
        }
        MvtConsigne other = (MvtConsigne) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.csys.template.caisse.domain.MvtConsigne[ id=" + id + " ]";
    }

}
