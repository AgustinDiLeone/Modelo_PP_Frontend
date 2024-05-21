namespace ModeloParcial
{
    export class Manejadora {

        private static url:string = "http://localhost:2024/";
        // ########### FETCH  ############

        private static async manejadorFetch(url : string, options : RequestInit):Promise<Response> { 
            return await fetch(url, options)
                .then(this.manejadorError);
        };
            
        private static manejadorError(res:Response):Response{
            if ( ! res.ok)
            {
                throw new Error(res.statusText);
            } 
        
            return res;
        };

        // ########### Parte 1 - Usuario - JSON  ############

        public static async AgregarUsuarioJSON() {
            const nombre =  (<HTMLInputElement>document.getElementById("nombre")).value;
            const correo =  (<HTMLInputElement>document.getElementById("correo")).value;
            const clave =  (<HTMLInputElement>document.getElementById("clave")).value;
            
            // Crear el objeto usuario
            const usuario = {
                "nombre" : nombre,
                "correo" : correo,
                "clave" : clave
            };
            
            // Definir las opciones para la solicitud fetch
            const opciones = {
                method: "POST",
                body: JSON.stringify(usuario),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            let respuesta = {
                "exito": false,
                "mensaje": "No se pudo agregar correctamente el usuario",
            };
            
            try {
                // Enviar la solicitud POST usando manejadorFetch
                let response = await this.manejadorFetch(this.url + "usuarioJSON", opciones);

                let resCadena = await response.text(); 
            
                // Informar por consola y alert
                console.log("Agregar: ", resCadena);
                alert("Se ha agregado correctamente");
                
                respuesta = {
                    exito: true,
                    mensaje: "Se agrego correctamente el usuario",
                };
                this.LimpiarFormJson();
                this.MostrarUsuariosJSON();
            
            } catch (error:any) {
                this.Fail(error);
                
            }
            return respuesta;
        }
        public static async MostrarUsuariosJSON(){

            let respuesta = {
                "exito": false,
                "usuarios": null,
            };
            const opciones = {
                method: "GET",
            };
            try {  

                let res = await this.manejadorFetch(this.url + "usuarioJSON", opciones);
        
                let resJSON = await res.json()
           
                // Informar por consola y alert
                //console.log("Mostrar: ", resJSON);
                alert("Se mostro los usuarios correctamente");
                                
                respuesta = {
                    "exito": true,
                    "usuarios": resJSON
                };
                this.MostrarListadoSuccess(resJSON);
        
            } catch (err:any) {
        
                this.Fail(err);
            }     
            return respuesta;     
        }
        public static MostrarListadoSuccess(data:any):void {

            let prod_obj_array: any[] = data.usuarios;
    
            console.log("Mostrar: ", prod_obj_array);
    
            let div = <HTMLDivElement>document.getElementById("divTabla");
    
            let tabla = `<table class="table table-hover">
                            <tr>
                                <th>Nombre</th><th>Correo</th><th>Clave</th>
                            </tr>`;
                        if(prod_obj_array.length < 1){
                            tabla += `<tr><td>---</td><td>---</td><td>---</td></tr>`;
                        }
                        else {
                            prod_obj_array.forEach((usuario: any) => {
                                if(usuario !== null){
                                    tabla += `<tr><td>${usuario.nombre}</td><td>${usuario.correo}</td><td>${usuario.clave}</td></tr>`;
                                }
                            });
                        }
            tabla += `</table>`;
                // Insertar la tabla dentro del elemento divTabla
            if (div) {
                div.innerHTML = tabla;
            }
        }
        public static async VerificarUsuarioJSON() {
            // Obtener los elementos del formulario
            const correo =  (<HTMLInputElement>document.getElementById("correo")).value;
            const clave =  (<HTMLInputElement>document.getElementById("clave")).value;

            // Crear el objeto usuario
            const usuario = {
                "correo" : correo,
                "clave" : clave
            };
            
            let respuesta = {
                "exito": false,
                "usuarios": "No se pudo verificar",
            };

            // Definir las opciones para la solicitud fetch
            const opciones = {
                method: "POST",
                body: JSON.stringify(usuario),
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            try {
                // Enviar la solicitud POST usando fetch
                let response = await fetch(this.url + "usuarioJSON/verificar", opciones);
                
                // Leer la respuesta como JSON
                let result = await response.json();
                
                // Informar por consola y alert
                console.log("verificar: ", result);
                if(result.exito){
                    alert("Se pudo verificar correctamente y existe el usuario ingresado");
                }else{
                    alert("Se pudo verificar correctamente pero NO existe el usuario ingresado");
                }              

            } catch (error:any) {

                this.Fail(error);
            }
        }
        
        // ########### Parte 2 - Usuario - BD  ############
        public static async AgregarUsuarioBD() {

            // Obtener los elementos del formulario
            const nombre =  (<HTMLInputElement>document.getElementById("nombre")).value;
            const correo =  (<HTMLInputElement>document.getElementById("correo")).value;
            const clave =  (<HTMLInputElement>document.getElementById("clave")).value;
            const id_perfil =  (<HTMLInputElement>document.getElementById("cboPerfiles")).value;

            // Crear el objeto usuario
            const usuario = {
                "nombre" : nombre,
                "correo" : correo,
                "clave" : clave,
                "id_perfil" : id_perfil
            };
            
            // Definir las opciones para la solicitud fetch
            const opciones = {
                method: "POST",
                body: JSON.stringify(usuario),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            // Definir la respuesta por default
            let respuesta = {
                "exito": false,
                "mensaje": "No se pudo agregar correctamente el usuario",
            };
            
            try {
                // Enviar la solicitud POST usando manejadorFetch
                let response = await this.manejadorFetch(this.url + "usuarioBD", opciones);

                let resCadena = await response.text(); 
            
                // Informar por consola y alert
                console.log("Agregar: ", resCadena);
                alert("Se ha agregado correctamente");
                
                //Modificar la respuesta
                respuesta = {
                    exito: true,
                    mensaje: "Se agrego correctamente el usuario",
                };
                this.Success();
            
            } catch (error:any) {
                this.Fail(error);
                
            }
            return respuesta;
        }
        public static async MostrarUsuariosBD(){

            // Definir la respuesta por default
            let respuesta = {
                "exito": false,
                "usuarios": null,
            };
            // Definir las opciones para la solicitud fetch
            const opciones = {
                method: "GET",
            };
            try {  

                let res = await this.manejadorFetch(this.url + "usuarioBD", opciones);
        
                let resJSON = await res.json()

                this.MostrarListadoSuccessBD(resJSON);
           
                //Informar por consola y alert
                console.log("Mostrar: ", resJSON);
                alert("Se ha mostrados los usuarios correctamente");
                                
                respuesta = {
                    "exito": true,
                    "usuarios": resJSON
                };
        
            } catch (err:any) {
        
                this.Fail(err);
            }     
            return respuesta;     
        }
        public static MostrarListadoSuccessBD(data:any):void {

            let prod_obj_array: any[] = data.usuarios;
    
            console.log("Mostrar: ", prod_obj_array);
    
            let div = <HTMLDivElement>document.getElementById("divTabla");
    
            let tabla = `<table class="table table-hover">
                            <tr>
                                <th>ID</th><th>NOMBRE</th><th>CORREO</th><th>CLAVE</th><th>PERFIL</th><th>ACCIONES</th>
                            </tr>`;
                        if(prod_obj_array.length < 1){
                            tabla += `<tr><td>---</td><td>---</td><td>---</td><td>---</td>
                                <td>---</td></tr>`;
                        }
                        else {
                            prod_obj_array.forEach((usuario: any) => {
                                if(usuario !== null){
                                    tabla += `<tr><td>${usuario.id}</td><td>${usuario.nombre}</td><td>${usuario.correo}</td><td>${usuario.clave}</td><td>${usuario.id_perfil}</td>
                                                    <td><button type="button" class="btn btn-info" id="" 
                                                    data-obj='${JSON.stringify(usuario)}' name="btnModificar">
                                                    <span class="bi bi-pencil"></span>
                                                </button>
                                                <button type="button" class="btn btn-danger" id="" 
                                                    data-id='${usuario.id}' name="btnEliminar">
                                                    <span class="bi bi-x-circle"></span>
                                                </button>
                                            </td></tr>`;
                                }
                            }); 
                        }
            tabla += `</table>`;
    
            div.innerHTML = tabla;
            
            document.getElementsByName("btnModificar").forEach((boton)=>{
    
                boton.addEventListener("click", ()=>{ 

                    let obj : any = boton.getAttribute("data-obj");
                    let obj_dato = JSON.parse(obj);
    
                    (<HTMLInputElement>document.getElementById("id")).value = obj_dato.id;
                    (<HTMLInputElement>document.getElementById("nombre")).value = obj_dato.nombre;
                    (<HTMLInputElement>document.getElementById("correo")).value = obj_dato.correo;   
                    (<HTMLInputElement>document.getElementById("clave")).value = obj_dato.clave;
                    (<HTMLInputElement>document.getElementById("cboPerfiles")).value = obj_dato.id_perfil;
  
                    (<HTMLInputElement>document.getElementById("id")).readOnly = true;
    
                    //let btn = (<HTMLInputElement>document.getElementById("btn-modificar"));
                    
                    //btn.onclick = ()=> this.ModificarUsuarioBD();
                });
            });
    
            document.getElementsByName("btnEliminar").forEach((boton)=>{
    
                boton.addEventListener("click", ()=>{ 

                    let id : any = boton.getAttribute("data-id");
                    
                    if(confirm(`¿Seguro de eliminar producto con id ${id}?`)){
                       
                        this.EliminarUsuarioBD(id);
                    }                   
                });
            });  
            (<HTMLInputElement>document.getElementById("id")).readOnly = false;  
        }
        public static async ModificarUsuarioBD() {
            
            // Obtener los elementos del formulario
            const id =  (<HTMLInputElement>document.getElementById("id")).value;
            const nombre =  (<HTMLInputElement>document.getElementById("nombre")).value;
            const correo =  (<HTMLInputElement>document.getElementById("correo")).value;
            const clave =  (<HTMLInputElement>document.getElementById("clave")).value;
            const id_perfil =  (<HTMLInputElement>document.getElementById("cboPerfiles")).value;
            
            let usuario = {
                "id" : id,
                "nombre" : nombre,
                "correo" : correo,
                "clave" : clave,
                "id_perfil" : id_perfil
            };

            // Definir la respuesta por default
            let respuesta = {
                "exito": false,
                "mensaje": "NO pudo ser modificado correctamente"
            };
               
            const opciones = {
                method: "PUT",
                body: JSON.stringify({
                    usuario_json: usuario
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            };
    
            try {
    
                let res = await this.manejadorFetch(this.url + "usuarioBD", opciones);
                
                let resCadena = await res.text(); 
                
                console.log("Modificar: ", resCadena);
                alert("Se ha modificado correctamente");

                respuesta = {
                    "exito": true,
                    "mensaje": "Se ha modificado correctamente"
                };
   
                this.Success();
    
            } catch (err:any) {
            
                this.Fail(err);
            }
            return respuesta;
        }
        public static async EliminarUsuarioBD(id:string) {      
        
            const opciones = {
                method: "DELETE",
                body: JSON.stringify({
                    "id": id
                }),
                headers: {"Accept": "*/*", "Content-Type": "application/json"},
            };
            // Definir la respuesta por default
            let respuesta = {
                "exito": false,
                "mensaje": "NO pudo ser modificado correctamente"
            };
    
            try {
    
                let res = await this.manejadorFetch(this.url + "usuarioBD", opciones);
            
                let resCadena = await res.text(); 
                
                console.log("Eliminar: ", resCadena);
                alert("Se ha eliminado correctamente");

                this.Success();

                respuesta = {
                    "exito": true,
                    "mensaje": "Se pudo eliminar correctamente"
                };
    
            } catch (err:any) {
            
                this.Fail(err);
            }
        }

        // ########### FAIL - SUCCESS  ############

        public static Fail(retorno:string):void {

            console.error(retorno);
            alert("Ha ocurrido un ERROR!!!");
        }
        public static Success() {
        
            this.MostrarUsuariosBD();
    
            this.LimpiarForm();
    
        }

        // ########### Limpiar Form 1 ############
        public static LimpiarFormJson(){
            (<HTMLInputElement>document.getElementById("nombre")).value = "";
            (<HTMLInputElement>document.getElementById("correo")).value = "";  
            (<HTMLInputElement>document.getElementById("clave")).value = ""; 

        }

        public static LimpiarForm(){
            (<HTMLInputElement>document.getElementById("nombre")).value = "";
            (<HTMLInputElement>document.getElementById("correo")).value = "";  
            (<HTMLInputElement>document.getElementById("clave")).value = ""; 
            (<HTMLInputElement>document.getElementById("id")).value = "";
            (<HTMLInputElement>document.getElementById("id")).readOnly = false;
            (<HTMLInputElement>document.getElementById("cboPerfiles")).value = "";  

        }
    }
}
           