package com.csys.template.caisse.web.rest;

import com.csys.template.caisse.dto.ObjetDTO;
import com.csys.template.caisse.service.ObjetService;
import com.csys.template.util.RestPreconditions;
import java.lang.Long;
import java.lang.String;
import java.lang.Void;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.List;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
 * REST controller for managing Objet.
 */
@RestController
@RequestMapping("/api")
public class ObjetResource {
  private static final String ENTITY_NAME = "objet";

  private final ObjetService objetService;

  private final Logger log = LoggerFactory.getLogger(ObjetService.class);

  public ObjetResource(ObjetService objetService) {
    this.objetService=objetService;
  }

  /**
   * POST  /objets : Create a new objet.
   *
   * @param objetDTO
   * @param bindingResult
   * @return the ResponseEntity with status 201 (Created) and with body the new objet, or with status 400 (Bad Request) if the objet has already an ID
   * @throws URISyntaxException if the Location URI syntax is incorrect
   * @throws org.springframework.web.bind.MethodArgumentNotValidException
   */
  @PostMapping("/objets")
  public ResponseEntity<ObjetDTO> createObjet(@Valid @RequestBody ObjetDTO objetDTO, BindingResult bindingResult) throws URISyntaxException, MethodArgumentNotValidException {
    log.debug("REST request to save Objet : {}", objetDTO);
    if ( objetDTO.getCode() != null) {
      bindingResult.addError( new FieldError("ObjetDTO","code","POST method does not accepte "+ENTITY_NAME+" with code"));
      throw new MethodArgumentNotValidException(null, bindingResult);
    }
    if (bindingResult.hasErrors()) {
      throw new MethodArgumentNotValidException(null, bindingResult);
    }
    ObjetDTO result = objetService.save(objetDTO);
    return ResponseEntity.created( new URI("/api/objets/"+ result.getCode())).body(result);
  }

  /**
   * PUT  /objets : Updates an existing objet.
   *
   * @param id
   * @param objetDTO the objet to update
   * @return the ResponseEntity with status 200 (OK) and with body the updated objet,
   * or with status 400 (Bad Request) if the objet is not valid,
   * or with status 500 (Internal Server Error) if the objet couldn't be updated
   * @throws org.springframework.web.bind.MethodArgumentNotValidException
   */
  @PutMapping("/objets")
  public ResponseEntity<ObjetDTO> updateObjet( @Valid @RequestBody ObjetDTO objetDTO) throws MethodArgumentNotValidException {
    log.debug("Request to update Objet: {}");
    ObjetDTO result =objetService.update(objetDTO);
    return ResponseEntity.ok().body(result);
  }

  /**
   * GET /objets/{id} : get the "id" objet.
   *
   * @param id the id of the objet to retrieve
   * @return the ResponseEntity with status 200 (OK) and with body of objet, or with status 404 (Not Found)
   */
  @GetMapping("/objets/{id}")
  public ResponseEntity<ObjetDTO> getObjet(@PathVariable Long id) {
    log.debug("Request to get Objet: {}",id);
    ObjetDTO dto = objetService.findOne(id);
    RestPreconditions.checkFound(dto, "objet.NotFound");
    return ResponseEntity.ok().body(dto);
  }

  /**
   * GET /objets : get all the objets.
   *
   * @return the ResponseEntity with status 200 (OK) and the list of objets in body
   */
  @GetMapping("/objets")
  public List<ObjetDTO> getAllObjets() {
    log.debug("Request to get all  Objets : {}");
    return objetService.findAll();
  }

  /**
   * DELETE  /objets/{id} : delete the "id" objet.
   *
   * @param id the id of the objet to delete
   * @return the ResponseEntity with status 200 (OK)
   */
  @DeleteMapping("/objets/{id}")
  public ResponseEntity<Void> deleteObjet(@PathVariable Long id) {
    log.debug("Request to delete Objet: {}",id);
    objetService.delete(id);
    return ResponseEntity.ok().build();
  }
}

