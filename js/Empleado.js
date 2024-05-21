"use strict";
var Entidades;
(function (Entidades) {
    class Empleado extends Entidades.Usuario {
        constructor(nombre, correo, clave, id, id_perfil, perfil, sueldo, foto) {
            super(nombre, correo, clave, id, id_perfil, perfil);
            this.sueldo = sueldo;
            this.foto = foto;
        }
        ToJSON() {
            const usuarioString = super.ToString();
            const empleadoString = `"sueldo":${this.sueldo},"foto":"${this.foto}"`;
            return `{${usuarioString},${empleadoString}}\n`;
        }
    }
    Entidades.Empleado = Empleado;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Empleado.js.map