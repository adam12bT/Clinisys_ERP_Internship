package com.csys.template.service;

import com.csys.template.DTO.ArticleDTO;
import com.csys.template.domain.Article;
import com.csys.template.factoy.ArticleFactory;
import com.csys.template.represontory.ArticleRepository;
import com.csys.template.util.Preconditions;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    public List<ArticleDTO> findAll() {
        List<Article> result = articleRepository.findAll();
        return ArticleFactory.articleToArticleDTOs(result);
    }

    @Transactional(readOnly = true)

    public ArticleDTO findById(Integer id) {
        Article article = articleRepository.findById(id).orElse(null);
        ArticleDTO articleDTO = ArticleFactory.articleToArticleDTO(article);
        return articleDTO;

    }

    @Transactional(readOnly = true)

    public ArticleDTO save(ArticleDTO articleDTO) {
        Optional<Article> articleInbase = articleRepository.findById(articleDTO.getCode());
        Preconditions.checkBusinessLogique(articleInbase != null, "article has been deleted ");
        Article article = ArticleFactory.articleDTOTOArticle(articleDTO);
        article = articleRepository.saveAndFlush(article);
        return ArticleFactory.articleToArticleDTO(article);
    }

    public ArticleDTO update(ArticleDTO articleDTO) {
        Article article = articleRepository.findById(articleDTO.getCode()).orElse(null);
        Preconditions.checkBusinessLogique(article != null, "L'article n'existe pas");
        article = articleRepository.save(ArticleFactory.articleDTOTOArticle(articleDTO));
        return ArticleFactory.articleToArticleDTO(article);
    }

    public void deleteById(Integer id) {
        articleRepository.deleteById(id);
    }
}
