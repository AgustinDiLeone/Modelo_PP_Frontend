namespace Entidades
{

    export class Persona{
        protected nombre: string;
        protected correo: string;
        protected clave: string;

        public constructor(nombre: string, correo: string, clave?: string) {
            this.nombre = nombre;
            this.correo = correo;
            this.clave = clave || ""; // Asignar una cadena vacía si no se proporciona clave
        }

        public ToString(): string {
            return `"nombre":"${this.nombre}","correo":"${this.correo}","clave":"${this.clave}"`;
        }

        public ToJSON(): string {
            return `{${this.ToString()}\n}`;
        }
    }
}
