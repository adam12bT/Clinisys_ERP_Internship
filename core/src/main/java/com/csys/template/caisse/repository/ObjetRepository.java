package com.csys.template.caisse.repository;

import com.csys.template.caisse.domain.Objet;
import java.lang.Long;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Objet entity.
 */
@Repository
public interface ObjetRepository extends JpaRepository<Objet, Long> {
}

