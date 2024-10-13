/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.csys.template.represontory;

import com.csys.template.domain.Categorie;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author adamb
 */
public interface CategorieRepresotory  extends JpaRepository<Categorie,Long> {

    @Override
     Optional<Categorie> findById(Long Id);


    public void deleteById(Long id);




    
}
