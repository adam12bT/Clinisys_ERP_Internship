/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.csys.template.represontory;

import com.csys.template.domain.Article;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author adamb
 */
@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {

    public Article findByCode(Integer code);

    void deleteById(Integer id);

}
