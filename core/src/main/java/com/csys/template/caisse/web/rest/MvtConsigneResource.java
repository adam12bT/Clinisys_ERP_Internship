package com.csys.template.caisse.web.rest;

import com.csys.template.caisse.dto.MvtConsigneDTO;
import com.csys.template.caisse.service.MvtConsigneService;
import com.csys.template.util.RestPreconditions;
import java.lang.Long;
import java.lang.String;
import java.lang.Void;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
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
 * REST controller for managing MvtConsigne.
 */
@RestController
@RequestMapping("/api")
public class MvtConsigneResource {
  private static final String ENTITY_NAME = "mvtconsigne";

  private final MvtConsigneService mvtconsigneService;

  private final Logger log = LoggerFactory.getLogger(MvtConsigneService.class);

  public MvtConsigneResource(MvtConsigneService mvtconsigneService) {
    this.mvtconsigneService=mvtconsigneService;
  }

  
  @PostMapping("/mvtconsignes")
  public ResponseEntity<MvtConsigneDTO> createMvtConsigne(@Valid @RequestBody MvtConsigneDTO mvtconsigneDTO, BindingResult bindingResult) throws URISyntaxException, MethodArgumentNotValidException {
    log.debug("REST request to save MvtConsigne : {}", mvtconsigneDTO);
    if ( mvtconsigneDTO.getId() != null) {
      bindingResult.addError( new FieldError("MvtConsigneDTO","id","POST method does not accepte "+ENTITY_NAME+" with code"));
      throw new MethodArgumentNotValidException(null, bindingResult);
    }
    if (bindingResult.hasErrors()) {
      throw new MethodArgumentNotValidException(null, bindingResult);
    }
    MvtConsigneDTO result = mvtconsigneService.save(mvtconsigneDTO);
    return ResponseEntity.created( new URI("/api/mvtconsignes/"+ result.getId())).body(result);
  }

  @PutMapping("/mvtconsignes/{id}")
  public ResponseEntity<MvtConsigneDTO> updateMvtConsigne(@PathVariable Long id, @Valid @RequestBody MvtConsigneDTO mvtconsigneDTO) throws MethodArgumentNotValidException {
    log.debug("Request to update MvtConsigne: {}",id);
    mvtconsigneDTO.setId(id);
    MvtConsigneDTO result =mvtconsigneService.update(mvtconsigneDTO);
    return ResponseEntity.ok().body(result);
  }

  @GetMapping("/mvtconsignes/{id}")
  public ResponseEntity<MvtConsigneDTO> getMvtConsigne(@PathVariable Long id) {
    log.debug("Request to get MvtConsigne: {}",id);
    MvtConsigneDTO dto = mvtconsigneService.findOne(id);
    RestPreconditions.checkFound(dto, "mvtconsigne.NotFound");
    return ResponseEntity.ok().body(dto);
  }

  @GetMapping("/mvtconsignes")
  public Collection<MvtConsigneDTO> getAllMvtConsignes() {
    log.debug("Request to get all  MvtConsignes : {}");
    return mvtconsigneService.findAll();
  }

  @DeleteMapping("/mvtconsignes/{id}")
  public ResponseEntity<Void> deleteMvtConsigne(@PathVariable Long id) {
    log.debug("Request to delete MvtConsigne: {}",id);
    mvtconsigneService.delete(id);
    return ResponseEntity.ok().build();
  }
}

