/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.csys.template.DTO;

/**
 *
 * @author adamb
 */

public class ArticleDTO {

    private Integer code;

 
    private String desgnation;
 
    private long prixAchat;
    private String categorie;

    private CategorieDTO categorieDTO;
    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public ArticleDTO() {
    }

    public ArticleDTO(Integer code) {
        this.code = code;
    }

    public ArticleDTO(Integer code, String desgnation, long prixAchat) {
        this.code = code;
        this.desgnation = desgnation;
        this.prixAchat = prixAchat;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getDesgnation() {
        return desgnation;
    }

    public void setDesgnation(String desgnation) {
        this.desgnation = desgnation;
    }

    public long getPrixAchat() {
        return prixAchat;
    }

    public void setPrixAchat(long prixAchat) {
        this.prixAchat = prixAchat;
    }

    public CategorieDTO getCategorieDTO() {
        return categorieDTO;
    }

    public void setCategorieDTO(CategorieDTO categorieDTO) {
        this.categorieDTO = categorieDTO;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (code != null ? code.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof ArticleDTO)) {
            return false;
        }
        ArticleDTO other = (ArticleDTO) object;
        if ((this.code == null && other.code != null) || (this.code != null && !this.code.equals(other.code))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.csys.template.domain.Article[ code=" + code + " ]";
    }
}
