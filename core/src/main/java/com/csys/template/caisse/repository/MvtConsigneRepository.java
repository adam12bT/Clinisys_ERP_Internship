package com.csys.template.caisse.repository;

import com.csys.template.caisse.domain.MvtConsigne;
import java.lang.Long;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the MvtConsigne entity.
 */
@Repository
public interface MvtConsigneRepository extends JpaRepository<MvtConsigne, Long> {
}

