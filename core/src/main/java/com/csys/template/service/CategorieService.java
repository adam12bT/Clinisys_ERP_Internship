/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.csys.template.service;

import com.csys.template.DTO.CategorieDTO;
import com.csys.template.domain.Categorie;
import com.csys.template.factoy.CategorieFactory;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import com.csys.template.represontory.CategorieRepresotory;
import com.csys.template.util.Preconditions;
import org.springframework.stereotype.Service;

/**
 *
 * @author adamb
 */
@Service
@Transactional
public class CategorieService {

    @Autowired
    private CategorieRepresotory categorieRepresotory;

    public Collection<CategorieDTO> findAll() {
        List<Categorie> result = categorieRepresotory.findAll();
        return CategorieFactory.categorieTocategorieDTOs(result);
    }

    @Transactional(readOnly = true)
    public List<CategorieDTO> findById(Long id) {
        Optional<Categorie> categorie = categorieRepresotory.findById(id);

        if (categorie.isPresent()) {
            return CategorieFactory.categorieTocategorieDTOs(Collections.singletonList(categorie.get()));
        }
        return Collections.emptyList();
    }

    @Transactional(readOnly = true)
    public CategorieDTO save(CategorieDTO categorieDTO) {
           Optional<Categorie> categorieInbase=categorieRepresotory.findById(categorieDTO.getIdcategorie());
           Preconditions.checkBusinessLogique(categorieInbase !=null,"catgorie has been deleted ");
        
        
        Categorie categorie = CategorieFactory.CategorieDTOToCategorie(categorieDTO);
        categorie = categorieRepresotory.saveAndFlush(categorie);
        return CategorieFactory.CategorieToCategorieDTO(categorie);
    }
    
    public CategorieDTO update(CategorieDTO categorieDTO) {
       Categorie article = categorieRepresotory.findById(categorieDTO.getIdcategorie()).orElse(null);
        Preconditions.checkBusinessLogique(article != null, "la categorie  n'existe pas");
        article = categorieRepresotory.save(CategorieFactory.CategorieDTOToCategorie(categorieDTO));
        return CategorieFactory.CategorieToCategorieDTO(article);
    }
    public void deleteById(Long id) {
      
        categorieRepresotory.deleteById(id);
    }
}
