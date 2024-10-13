/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.csys.template.web.rest;

import com.csys.template.DTO.ArticleDTO;
import com.csys.template.domain.Article;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.csys.template.service.ArticleService;
import com.csys.template.util.RestPreconditions;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

/**
 *
 * @author adamb
 */
@RestController
@RequestMapping("/api/articles")
public class ArticleRessource {

    private final ArticleService articleService;

    public ArticleRessource(ArticleService articleService) {
        this.articleService = articleService;
    }

    private final static String ENTITY_NAME = "arcticle";

    @GetMapping
    public Collection<ArticleDTO> findall() {

        return articleService.findAll();

    }

    @GetMapping("/{Id}")
    public ArticleDTO findById(@PathVariable Integer Id) {
        ArticleDTO article = articleService.findById(Id);
        RestPreconditions.checkFound(article, ENTITY_NAME + " not found");
        return article;
    }

    @PostMapping
    public ResponseEntity<ArticleDTO> addArticle(@RequestBody ArticleDTO articleDTO, BindingResult bindingResults) throws URISyntaxException, MethodArgumentNotValidException {
        /*     if (articleDTO.getCode() != null) {
        bindingResults.addError(new FieldError( ENTITY_NAME ,"code","post dose not allowed"));
        throw new MethodArgumentNotValidException(null,bindingResults);
    }*/
        ArticleDTO resultart = articleService.save(articleDTO);
        return ResponseEntity.created(new URI("/api/articles/" + resultart.getCode())).body(resultart);
    }

    @PutMapping
    public ResponseEntity<ArticleDTO> updateArtcile(@RequestBody ArticleDTO articleDTO) throws URISyntaxException {
        ArticleDTO resultart = articleService.update(articleDTO);
        return ResponseEntity.ok(resultart);
    }

    @DeleteMapping("/{Id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Integer Id) {
        articleService.deleteById(Id);
        return ResponseEntity.ok().build();
    }
}
