package com.csys.template.caisse.factory;

import com.csys.template.caisse.domain.MvtConsigne;
import com.csys.template.caisse.dto.MvtConsigneDTO;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class MvtConsigneFactory {
  public static MvtConsigneDTO mvtconsigneToMvtConsigneDTO(MvtConsigne mvtconsigne) {
    MvtConsigneDTO mvtconsigneDTO=new MvtConsigneDTO();
    mvtconsigneDTO.setId(mvtconsigne.getId());
    mvtconsigneDTO.setAutreFormation(mvtconsigne.getAutreFormation());
    mvtconsigneDTO.setDateEntree(mvtconsigne.getDateEntree());
    mvtconsigneDTO.setDateSortie(mvtconsigne.getDateSortie());
    mvtconsigneDTO.setEtat(mvtconsigne.getEtat());
    mvtconsigneDTO.setClientDTO(ClientFactory.clientToClientDTO(mvtconsigne.getNumdoss()));
    mvtconsigneDTO.setObjetDTO(ObjetFactory.objetToObjetDTO(mvtconsigne.getCodeObjet()));
    mvtconsigneDTO.setUserDTO(UserFactory.userToUserDTO(mvtconsigne.getUserEntree()));
    mvtconsigneDTO.setUserDTO1(UserFactory.userToUserDTO(mvtconsigne.getUserSortie()));
    return mvtconsigneDTO;
  }

  public static MvtConsigne mvtconsigneDTOToMvtConsigne(MvtConsigneDTO mvtconsigneDTO) {
    MvtConsigne mvtconsigne=new MvtConsigne();
    mvtconsigne.setId(mvtconsigneDTO.getId());
    mvtconsigne.setAutreFormation(mvtconsigneDTO.getAutreFormation());
    mvtconsigne.setDateEntree(mvtconsigneDTO.getDateEntree());
    mvtconsigne.setDateSortie(mvtconsigneDTO.getDateSortie());
    mvtconsigne.setEtat(mvtconsigneDTO.getEtat());
    mvtconsigne.setNumdoss(ClientFactory.clientDTOToClient(mvtconsigneDTO.getClientDTO()));
    mvtconsigne.setCodeObjet(ObjetFactory.objetDTOToObjet(mvtconsigneDTO.getObjetDTO(),null));
    mvtconsigne.setUserEntree(UserFactory.userDTOToUser(mvtconsigneDTO.getUserDTO()));
    mvtconsigne.setUserSortie(UserFactory.userDTOToUser(mvtconsigneDTO.getUserDTO1()));
    return mvtconsigne;
  }

  public static Collection<MvtConsigneDTO> mvtconsigneToMvtConsigneDTOs(Collection<MvtConsigne> mvtconsignes) {
    List<MvtConsigneDTO> mvtconsignesDTO=new ArrayList<>();
    mvtconsignes.forEach(x -> {
      mvtconsignesDTO.add(mvtconsigneToMvtConsigneDTO(x));
    } );
    return mvtconsignesDTO;
  }
}

