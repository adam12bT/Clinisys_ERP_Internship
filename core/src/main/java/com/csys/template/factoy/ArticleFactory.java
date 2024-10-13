/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.csys.template.factoy;

import com.csys.template.DTO.ArticleDTO;
import com.csys.template.domain.Article;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 *
 * @author adamb
 */
public class ArticleFactory {

    public static Article articleDTOTOArticle(ArticleDTO articleDTO) {
        Article article = new Article();
        article.setCode(articleDTO.getCode());
        article.setDesgnation(articleDTO.getDesgnation());
        article.setPrixAchat(articleDTO.getPrixAchat());
        article.setIdcatigory(CategorieFactory.CategorieDTOToCategorie(articleDTO.getCategorieDTO()));
        return article;
    }

    public static ArticleDTO articleToArticleDTO(Article article) {
        if (article != null) {
            ArticleDTO articleDTO = new ArticleDTO();
            articleDTO.setCode(article.getCode());
            articleDTO.setDesgnation(article.getDesgnation());
            articleDTO.setPrixAchat(article.getPrixAchat());
            articleDTO.setCategorie(article.getIdcatigory().getNomcatigorie());
            articleDTO.setCategorieDTO(CategorieFactory.CategorieToCategorieDTO(article.getIdcatigory()));
            return articleDTO;
        } else {
            return null;
        }
    }

    public static List<ArticleDTO> articleToArticleDTOs(Collection<Article> articles) {
        List<ArticleDTO> ArticleDTOs = new ArrayList<>();
        for (Article article : articles) {
            ArticleDTO articleDTO = articleToArticleDTO(article);
            ArticleDTOs.add(articleDTO);
        }
        return ArticleDTOs;
    }
}
