namespace Entidades
{
    export class Empleado extends Usuario {
        private sueldo: number;
        private foto: string;

        public constructor(nombre: string, correo: string, clave: string, id: number, id_perfil: number, perfil: string, sueldo: number, foto: string) {
            super(nombre, correo, clave, id, id_perfil, perfil);
            this.sueldo = sueldo;
            this.foto = foto;
        }

        public ToJSON(): string {
            const usuarioString = super.ToString();
            const empleadoString = `"sueldo":${this.sueldo},"foto":"${this.foto}"`;
            return `{${usuarioString},${empleadoString}}\n`;
        }
    }
}