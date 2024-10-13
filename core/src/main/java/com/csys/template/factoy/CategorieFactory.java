/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.csys.template.factoy;

import com.csys.template.DTO.CategorieDTO;
import com.csys.template.domain.Categorie;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author adamb
 */
public class CategorieFactory {

    public static Categorie CategorieDTOToCategorie(CategorieDTO CategorieDTO) {

        Categorie categorie = new Categorie();
        categorie.setIdcategorie(CategorieDTO.getIdcategorie());
        categorie.setNomcatigorie(CategorieDTO.getNomcatigorie());
//        List<Article> articles = new ArrayList();
//        for (ArticleDTO aricledto : CategorieDTO.getArticleList()) {
//            Article article = ArticleFactory.articleDTOTOArticle(aricledto);
//            articles.add(article);
//        }
//      categorie.setArticleList(articles);
        return categorie;
    }
public static CategorieDTO CategorieToCategorieDTO(Categorie categorie) {
        if (categorie != null) {
            CategorieDTO categorieDTO = new CategorieDTO();
            categorieDTO.setIdcategorie(categorie.getIdcategorie());
            categorieDTO.setNomcatigorie(categorie.getNomcatigorie());
            //categorieDTO.setArticleList(ArticleFactory.articltToArticleDTOs(categorie.getArticleList()));
            return categorieDTO;
        } else {
            return null;
        }
    }

    public static CategorieDTO lazyCategorieDTOToCategorie(Categorie categorie) {
        if (categorie != null) {
            CategorieDTO categorieDTO = new CategorieDTO();
            categorieDTO.setIdcategorie(categorie.getIdcategorie());

            categorieDTO.setNomcatigorie(categorie.getNomcatigorie());
            return categorieDTO;
        } else {
            return null;
        }
    }

    public static List<CategorieDTO> categorieTocategorieDTOs(List<Categorie> categories) {
        List<CategorieDTO> CategorieDTOs = new ArrayList<>();
        categories.stream().map(categorie -> lazyCategorieDTOToCategorie(categorie)).forEachOrdered(CategorieDTO -> {
            CategorieDTOs.add(CategorieDTO);
        });
        return CategorieDTOs;
    }

}
