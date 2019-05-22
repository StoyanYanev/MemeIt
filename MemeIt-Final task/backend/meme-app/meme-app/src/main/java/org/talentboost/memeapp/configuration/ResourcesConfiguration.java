package org.talentboost.memeapp.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ResourcesConfiguration implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry handlerRegistry){
        handlerRegistry.addResourceHandler("/memeImages/**").addResourceLocations("file:src/main/resources/static/memeImages/");
    }
}
