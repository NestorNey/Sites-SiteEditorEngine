export class Sites {

    static components = [];

    static registryComponents() {
        // Registro: Estilo-Default Tipo-Header Plantilla-6
        this.components.push(
            require('@/lib/sites/SiteComponent.tsx').MyHeader
        );

        // Registro: Estilo-Minimalista Tipo-Carrusel Plantilla-1
        this.components.push(
            // require('@/lib/sites/SiteComponent')
        );
        // Registro: Estilo-Minimalista Tipo-Carrusel Plantilla-2
        this.components.push(
            // require('@/lib/sites/SiteComponent')
        );
    }

    static getComponents(){
        return this.components;
    }
}
