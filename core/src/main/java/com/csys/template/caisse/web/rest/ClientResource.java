package com.csys.template.caisse.web.rest;

import com.csys.template.caisse.dto.ClientDTO;
import com.csys.template.caisse.service.ClientService;
import com.csys.template.util.RestPreconditions;
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
 * REST controller for managing Client.
 */
@RestController
@RequestMapping("/api")
public class ClientResource {
  private static final String ENTITY_NAME = "client";

  private final ClientService clientService;

  private final Logger log = LoggerFactory.getLogger(ClientService.class);

  public ClientResource(ClientService clientService) {
    this.clientService=clientService;
  }

  
  @PostMapping("/clients")
  public ResponseEntity<ClientDTO> createClient(@Valid @RequestBody ClientDTO clientDTO, BindingResult bindingResult) throws URISyntaxException, MethodArgumentNotValidException {
    log.debug("REST request to save Client : {}", clientDTO);
    if ( clientDTO.getNumDoss() == null ||  clientDTO.getNumDoss().isEmpty() ) {
      bindingResult.addError( new FieldError("ClientDTO","numDoss","POST method does not accepte "+ENTITY_NAME+" without code"));
      throw new MethodArgumentNotValidException(null, bindingResult);
    }
    if (bindingResult.hasErrors()) {
      throw new MethodArgumentNotValidException(null, bindingResult);
    }
    ClientDTO result = clientService.save(clientDTO);
    return ResponseEntity.created( new URI("/api/clients/"+ result.getNumDoss())).body(result);
  }

  @PutMapping("/clients/{id}")
  public ResponseEntity<ClientDTO> updateClient(@PathVariable String id, @Valid @RequestBody ClientDTO clientDTO) throws MethodArgumentNotValidException {
    log.debug("Request to update Client: {}",id);
    clientDTO.setNumDoss(id);
    ClientDTO result =clientService.update(clientDTO);
    return ResponseEntity.ok().body(result);
  }

  
  @GetMapping("/clients/{id}")
  public ResponseEntity<ClientDTO> getClient(@PathVariable String id) {
    log.debug("Request to get Client: {}",id);
    ClientDTO dto = clientService.findOne(id);
    RestPreconditions.checkFound(dto, "client.NotFound");
    return ResponseEntity.ok().body(dto);
  }

  @GetMapping("/clients")
  public Collection<ClientDTO> getAllClients() {
    log.debug("Request to get all  Clients : {}");
    return clientService.findAll();
  }


  @DeleteMapping("/clients/{id}")
  public ResponseEntity<Void> deleteClient(@PathVariable String id) {
    log.debug("Request to delete Client: {}",id);
    clientService.delete(id);
    return ResponseEntity.ok().build();
  }
}

