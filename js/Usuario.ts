namespace Entidades
{
    export class Usuario extends Persona {
        protected id: number;
        protected id_perfil: number;
        protected perfil: string;

        public constructor(nombre: string, correo: string, clave: string, id: number, id_perfil: number, perfil: string) {
            super(nombre, correo, clave);
            this.id = id;
            this.id_perfil = id_perfil;
            this.perfil = perfil;
        }

        public ToJSON(): string {
            const personaString = super.ToString();
            const usuarioString = `"id":${this.id},"id_perfil":${this.id_perfil},"perfil":"${this.perfil}"`;
            return `{${personaString},${usuarioString}}\n`;
        }
    }
}