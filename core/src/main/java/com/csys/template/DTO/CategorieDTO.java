/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.csys.template.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.Collection;

/**
 *
 * @author adamb
 */
@JsonInclude(JsonInclude.Include.NON_NULL)

public class CategorieDTO  {

    private Long idcategorie;
  
    private String nomcatigorie;
    private Collection<ArticleDTO> articleList;

    public CategorieDTO() {
    }

    public CategorieDTO(Long idcategorie) {
        this.idcategorie = idcategorie;
    }

    public CategorieDTO(Long idcategorie, String nomcatigorie) {
        this.idcategorie = idcategorie;
        this.nomcatigorie = nomcatigorie;
    }

    public Long getIdcategorie() {
        return idcategorie;
    }

    public void setIdcategorie(Long idcategorie) {
        this.idcategorie = idcategorie;
    }

    public String getNomcatigorie() {
        return nomcatigorie;
    }

    public void setNomcatigorie(String nomcatigorie) {
        this.nomcatigorie = nomcatigorie;
    }

    public Collection<ArticleDTO> getArticleList() {
        return articleList;
    }

    public void setArticleList(Collection<ArticleDTO> articleList) {
        this.articleList = articleList;
    }


    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idcategorie != null ? idcategorie.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CategorieDTO)) {
            return false;
        }
        CategorieDTO other = (CategorieDTO) object;
        if ((this.idcategorie == null && other.idcategorie != null) || (this.idcategorie != null && !this.idcategorie.equals(other.idcategorie))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.csys.template.domain.Categorie[ idcategorie=" + idcategorie + " ]";
    }

 




}
