package c24_71_ft_webapp.nexcognifix.infrastructure.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        // Este metodo agrega el prefijo /api a todas las rutas de los controladores
        configurer.addPathPrefix("api", c -> true);
    }
}

