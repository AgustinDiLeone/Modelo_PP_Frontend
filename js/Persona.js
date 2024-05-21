"use strict";
var Entidades;
(function (Entidades) {
    class Persona {
        constructor(nombre, correo, clave) {
            this.nombre = nombre;
            this.correo = correo;
            this.clave = clave || "";
        }
        ToString() {
            return `"nombre":"${this.nombre}","correo":"${this.correo}","clave":"${this.clave}"`;
        }
        ToJSON() {
            return `{${this.ToString()}\n}`;
        }
    }
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Persona.js.map