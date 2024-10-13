/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.csys.template.web.rest;

import com.csys.template.DTO.CategorieDTO;
import com.csys.template.domain.Categorie;
import com.csys.template.service.CategorieService;
import com.csys.template.util.RestPreconditions;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author adamb
 */
@RestController
@RequestMapping("/api/categories")
public class CategorieRessource {

    /*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
     */

    /**
     *
     * @author adamb
     */
    private final CategorieService categorieService;

    public CategorieRessource(CategorieService categorieService) {
        this.categorieService = categorieService;
    }

    private final static String ENTITY_NAME = "categorie";

    /**
     *
     * @return
     */
    @GetMapping
    public Collection<CategorieDTO> findall() {
        return categorieService.findAll();

    }

    @GetMapping("/{Id}")

    public List< CategorieDTO> findById(@PathVariable Long Id) {
        List<CategorieDTO> categorie = categorieService.findById(Id);
        RestPreconditions.checkFound(categorie, ENTITY_NAME + " not found");
        return categorie;
    }

    @PostMapping
    public ResponseEntity<CategorieDTO> addCategorie(@Valid @RequestBody CategorieDTO categorieDTO,BindingResult  bindingResults) throws URISyntaxException, MethodArgumentNotValidException {
                   if (categorieDTO.getIdcategorie() != null) {
        bindingResults.addError(new FieldError( ENTITY_NAME ,"code","post dose not allowed"));
        throw new MethodArgumentNotValidException(null,bindingResults);
    }
        CategorieDTO resultart = categorieService.save(categorieDTO);
        return ResponseEntity.created(new URI("/api/categories/" + resultart.getIdcategorie())).body(resultart);
    }

    @PutMapping
    public ResponseEntity<CategorieDTO> updateCAtrgoeirz(@RequestBody CategorieDTO categorieDTo) throws URISyntaxException, MethodArgumentNotValidException {
        CategorieDTO resultart = categorieService.update(categorieDTo);
        return ResponseEntity.ok(resultart);
    }

    @DeleteMapping("/{Id}")
    public ResponseEntity<Void> deletecategorie(@PathVariable Long Id) throws URISyntaxException {
        categorieService.deleteById(Id);
        return ResponseEntity.ok().build();
    }
}
