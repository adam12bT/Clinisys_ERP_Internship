package com.csys.template.caisse.service;

import com.csys.template.caisse.domain.Objet;
import com.csys.template.caisse.dto.ObjetDTO;
import com.csys.template.caisse.factory.ObjetFactory;
import com.csys.template.caisse.repository.ObjetRepository;
import com.google.common.base.Preconditions;
import java.lang.Long;
import java.util.Collection;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing Objet.
 */
@Service
@Transactional
public class ObjetService {

    private final Logger log = LoggerFactory.getLogger(ObjetService.class);

    private final ObjetRepository objetRepository;

    public ObjetService(ObjetRepository objetRepository) {
        this.objetRepository = objetRepository;
    }

    /**
     * Save a objetDTO.
     *
     * @param objetDTO
     * @return the persisted entity
     */
    public ObjetDTO save(ObjetDTO objetDTO) {
        log.debug("Request to save Objet: {}", objetDTO); 
        Objet objet = ObjetFactory.objetDTOToObjet(objetDTO,new Objet());
        objet = objetRepository.save(objet);
        ObjetDTO resultDTO = ObjetFactory.objetToObjetDTO(objet);
        return resultDTO;
    }

    /**
     * Update a objetDTO.
     *
     * @param objetDTO
     * @return the updated entity
     */
    public ObjetDTO update(ObjetDTO objetDTO) {
        log.debug("Request to update Objet: {}", objetDTO);
        Objet inBase = objetRepository.findById(objetDTO.getCode()).orElse(null);;
        Preconditions.checkArgument(inBase != null, "objet.NotFound");
        Objet objet = ObjetFactory.objetDTOToObjet(objetDTO,inBase);
        objet = objetRepository.save(objet);
        ObjetDTO resultDTO = ObjetFactory.objetToObjetDTO(objet);
        return resultDTO;
    }

    @Transactional(
            readOnly = true
    )
    public ObjetDTO findOne(Long id) {
        log.debug("Request to get Objet: {}", id);
        Objet objet = objetRepository.findById(id).orElse(null);
        Preconditions.checkArgument(objet != null, "objet.NotFound");
        ObjetDTO dto = ObjetFactory.objetToObjetDTO(objet);
        return dto;
    }

    /**
     * Get one objet by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(
            readOnly = true
    )
    public Objet findObjet(Long id) {
        log.debug("Request to get Objet: {}", id);
        Objet objet = objetRepository.findById(id).orElse(null);
        return objet;
    }

    /**
     * Get all the objets.
     *
     * @return the the list of entities
     */
    @Transactional(
            readOnly = true
    )
    public List<ObjetDTO> findAll() {
        log.debug("Request to get All Objets");
        Collection<Objet> result = objetRepository.findAll();
        return ObjetFactory.objetToObjetDTOs(result);
    }

    /**
     * Delete objet by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Objet: {}", id);
        objetRepository.deleteById(id);
    }
}
