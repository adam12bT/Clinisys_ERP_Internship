package com.csys.template.caisse.factory;

import com.csys.template.caisse.domain.Objet;
import com.csys.template.caisse.dto.ObjetDTO;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class ObjetFactory {
  public static ObjetDTO objetToObjetDTO(Objet objet) {
    ObjetDTO objetDTO=new ObjetDTO();
    objetDTO.setCode(objet.getCode());
    objetDTO.setLilelle(objet.getLilelle());
    objetDTO.setDateCreation(objet.getDateCreation());
    objetDTO.setUserCreation(objet.getUserCreation());
    return objetDTO;
  }

  public static Objet objetDTOToObjet(ObjetDTO objetDTO,Objet objet) {
    objet.setCode(objetDTO.getCode());
    objet.setLilelle(objetDTO.getLilelle());
    objet.setDateCreation(objet.getDateCreation());
    objet.setUserCreation(objetDTO.getUserCreation());
    return objet;
  }

  public static List<ObjetDTO> objetToObjetDTOs(Collection<Objet> objets) {
    List<ObjetDTO> objetsDTO=new ArrayList<>();
    objets.forEach(x -> {
      objetsDTO.add(objetToObjetDTO(x));
    } );
    return objetsDTO;
  }
}

