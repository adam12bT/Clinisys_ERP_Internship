package com.csys.template.caisse.factory;

import com.csys.template.caisse.domain.Client;
import com.csys.template.caisse.dto.ClientDTO;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class ClientFactory {
  public static ClientDTO clientToClientDTO(Client client) {
    ClientDTO clientDTO=new ClientDTO();
    clientDTO.setNumDoss(client.getNumDoss());
    clientDTO.setNomCli(client.getNomCli());
    clientDTO.setPrenom(client.getPrenom());
    clientDTO.setNation(client.getNation());
    clientDTO.setSex(client.getSex());
    clientDTO.setMvtConsigneList(client.getMvtConsigneList());
    return clientDTO;
  }

  public static Client clientDTOToClient(ClientDTO clientDTO) {
    Client client=new Client();
    client.setNumDoss(clientDTO.getNumDoss());
    client.setNomCli(clientDTO.getNomCli());
    client.setPrenom(clientDTO.getPrenom());
    client.setNation(clientDTO.getNation());
    client.setSex(clientDTO.getSex());
    client.setMvtConsigneList(clientDTO.getMvtConsigneList());
    return client;
  }

  public static Collection<ClientDTO> clientToClientDTOs(Collection<Client> clients) {
    List<ClientDTO> clientsDTO=new ArrayList<>();
    clients.forEach(x -> {
      clientsDTO.add(clientToClientDTO(x));
    } );
    return clientsDTO;
  }
}

