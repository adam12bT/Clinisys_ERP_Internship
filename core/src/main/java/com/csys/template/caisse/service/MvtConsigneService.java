package com.csys.template.caisse.service;

import com.csys.template.caisse.domain.Client;
import com.csys.template.caisse.domain.MvtConsigne;
import com.csys.template.caisse.domain.Objet;
import com.csys.template.caisse.dto.ClientDTO;
import com.csys.template.caisse.dto.MvtConsigneDTO;
import com.csys.template.caisse.dto.ObjetDTO;
import com.csys.template.caisse.factory.MvtConsigneFactory;
import com.csys.template.caisse.repository.MvtConsigneRepository;
import com.csys.template.caisse.repository.ObjetRepository;
import com.csys.template.util.Preconditions;
import java.lang.Long;
import java.util.Collection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing MvtConsigne.
 */
@Service
@Transactional
public class MvtConsigneService {

    private final Logger log = LoggerFactory.getLogger(MvtConsigneService.class);

    private final MvtConsigneRepository mvtconsigneRepository;
    private final ObjetService objetService;
    private final ClientService clientService;

    public MvtConsigneService(MvtConsigneRepository mvtconsigneRepository, ObjetService objetService, ClientService clientService) {
        this.mvtconsigneRepository = mvtconsigneRepository;
        this.objetService = objetService;
        this.clientService = clientService;
    }

    public MvtConsigneDTO save(MvtConsigneDTO mvtconsigneDTO) {

        log.debug("Request to save MvtConsigne: {}", mvtconsigneDTO);
        Objet objet;
        Client client;
        objet = objetService.findObjet(mvtconsigneDTO.getObjetDTO().getCode());
        Preconditions.checkBusinessLogique(objet != null, "objet.NotFound");
        client= clientService.findClient(mvtconsigneDTO.getClientDTO().getNumDoss());
        Preconditions.checkBusinessLogique(client != null, "client.NotFound");
        MvtConsigne mvtconsigne = MvtConsigneFactory.mvtconsigneDTOToMvtConsigne(mvtconsigneDTO);

        mvtconsigne = mvtconsigneRepository.save(mvtconsigne);
        MvtConsigneDTO resultDTO = MvtConsigneFactory.mvtconsigneToMvtConsigneDTO(mvtconsigne);
        return resultDTO;
    }

    /**
     * Update a mvtconsigneDTO.
     *
     * @param mvtconsigneDTO
     * @return the updated entity
     */
    public MvtConsigneDTO update(MvtConsigneDTO mvtconsigneDTO) {
        
         Objet objet;
        Client client;
        objet = objetService.findObjet(mvtconsigneDTO.getObjetDTO().getCode());
        Preconditions.checkBusinessLogique(objet != null, "objet.NotFound");
        client= clientService.findClient(mvtconsigneDTO.getClientDTO().getNumDoss());
        Preconditions.checkBusinessLogique(client != null, "client.NotFound");

        log.debug("Request to update MvtConsigne: {}", mvtconsigneDTO);

        MvtConsigne inBase = mvtconsigneRepository.findById(mvtconsigneDTO.getId()).orElse(null);
        Preconditions.checkBusinessLogique(inBase != null, "mvtconsigne.NotFound");
        MvtConsigne mvtconsigne = MvtConsigneFactory.mvtconsigneDTOToMvtConsigne(mvtconsigneDTO);
        mvtconsigne = mvtconsigneRepository.save(mvtconsigne);
        MvtConsigneDTO resultDTO = MvtConsigneFactory.mvtconsigneToMvtConsigneDTO(mvtconsigne);
        return resultDTO;
    }

    /**
     * Get one mvtconsigneDTO by id.
     *
     * @param id the id of the entity
     * @return the entity DTO
     */
    @Transactional(
            readOnly = true
    )
    public MvtConsigneDTO findOne(Long id) {
        log.debug("Request to get MvtConsigne: {}", id);
        MvtConsigne mvtconsigne = mvtconsigneRepository.findById(id).orElse(null);
        MvtConsigneDTO dto = MvtConsigneFactory.mvtconsigneToMvtConsigneDTO(mvtconsigne);
        return dto;
    }

    /**
     * Get one mvtconsigne by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(
            readOnly = true
    )
    public MvtConsigne findMvtConsigne(Long id) {
        log.debug("Request to get MvtConsigne: {}", id);
        MvtConsigne mvtconsigne = mvtconsigneRepository.findById(id).orElse(null);
        return mvtconsigne;
    }

    /**
     * Get all the mvtconsignes.
     *
     * @return the the list of entities
     */
    @Transactional(
            readOnly = true
    )
    public Collection<MvtConsigneDTO> findAll() {
        log.debug("Request to get All MvtConsignes");
        Collection<MvtConsigne> result = mvtconsigneRepository.findAll();
        return MvtConsigneFactory.mvtconsigneToMvtConsigneDTOs(result);
    }

    /**
     * Delete mvtconsigne by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete MvtConsigne: {}", id);
        mvtconsigneRepository.deleteById(id);
    }
}
