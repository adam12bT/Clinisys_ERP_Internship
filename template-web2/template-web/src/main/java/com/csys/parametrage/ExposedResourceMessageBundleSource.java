package com.csys.parametrage;

import org.apache.log4j.Logger;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.Locale;
import java.util.Properties;

public class ExposedResourceMessageBundleSource extends ReloadableResourceBundleMessageSource {

    private static final Logger LOGGER = Logger.getLogger(ExposedResourceMessageBundleSource.class);

    @Override
    protected Properties loadProperties(Resource resource, String fileName) throws IOException {

        LOGGER.info("Load " + fileName);
        return super.loadProperties(resource, fileName);
    }

    public Properties getMessages(Locale locale) {
        return getMergedProperties(locale).getProperties();
    }
}
