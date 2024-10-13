package com.csys.parametrage;

import java.security.Principal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.*;
import javax.servlet.http.HttpServletRequest;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.support.RequestContextUtils;

@Controller
public class WelcomeController {

    private static final Logger logger = LoggerFactory.getLogger(WelcomeController.class);

    @RequestMapping("/")
    public String au(Map<String, Object> model, Locale locale) {
        return authentification(model, locale);
    }

    @RequestMapping("/login")
    public String authentification(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/body_page/authentification.jsp";
    }

    @RequestMapping("/edition")
    public String editionPDF(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/body_page/edition.jsp";
    }

    @RequestMapping(value = "translation", method = RequestMethod.GET)
    @ResponseBody
    public HashMap<String, String> translation(HttpServletRequest request) {
        Locale locale = RequestContextUtils.getLocale(request);
        ResourceBundle bundle = ResourceBundle.getBundle("i18n.messages_" + locale.getLanguage(), locale);
        HashMap json = new HashMap<String, String>();
        Set<String> keys = bundle.keySet();
        for (String key : keys) {
            json.put(key, JSONObject.wrap(bundle.getObject(key)));
        }
        return json;
    }

    @RequestMapping("menu")
    public String menu(Map<String, Object> model, Locale locale, Principal user) {
        model.put("username", SecurityContextHolder.getContext().getAuthentication().getName());
        return "/WEB-INF/master_page/index.jsp";
    }

    @RequestMapping("Acceuil")
    public String Acceuil(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/body_page/Acceuil.jsp";
    }

    @RequestMapping("header")
    public String header(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/jsp_header.jsp";
    }

    @RequestMapping("reconnect")
    public String reconnect(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/master_page/reconnect.jsp";
    }

    @RequestMapping("CategorieSociete")
    public String CategorieSociete(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/body_page/CategorieSociete.jsp";
    }
    @RequestMapping("User")
    public String User(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/body_page/User.jsp";
    }
      @RequestMapping("Objets")
    public String Objet(Map<String, Object> model, Locale locale) {
        return "/WEB-INF/body_page/objet.jsp";
    }
}
