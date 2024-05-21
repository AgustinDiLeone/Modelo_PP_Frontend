"use strict";
var Entidades;
(function (Entidades) {
    class Usuario extends Entidades.Persona {
        constructor(nombre, correo, clave, id, id_perfil, perfil) {
            super(nombre, correo, clave);
            this.id = id;
            this.id_perfil = id_perfil;
            this.perfil = perfil;
        }
        ToJSON() {
            const personaString = super.ToString();
            const usuarioString = `"id":${this.id},"id_perfil":${this.id_perfil},"perfil":"${this.perfil}"`;
            return `{${personaString},${usuarioString}}\n`;
        }
    }
    Entidades.Usuario = Usuario;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Usuario.js.map