namespace Modelo
{
    export class ManejadoraEmpleado {

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
        
        // ########### Parte 3 - Empleado - BD  ############

        public static async MostrarEmpleadosBD(){

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

                let res = await this.manejadorFetch(this.url + "empleadoBD", opciones);
        
                let resJSON = await res.json()

                this.MostrarListadoEmpleadoBD(resJSON);
           
                //Informar por consola y alert
                console.log("Mostrar: ", resJSON);
                alert("Se ha mostrados los empleados correctamente");
                                
                respuesta = {
                    "exito": true,
                    "usuarios": resJSON
                };
        
            } catch (err:any) {
        
                this.Fail(err);
            }     
            return respuesta;     
        }
        public static MostrarListadoEmpleadoBD(data:any):void {

            let prod_obj_array: any[] = data.usuarios;
    
            //console.log("Mostrar: ", prod_obj_array);
    
            let div = <HTMLDivElement>document.getElementById("divTablaEmpleados");
    
            let tabla = `<table class="table table-hover">
                            <tr>
                                <th>ID</th><th>NOMBRE</th><th>CORREO</th><th>CLAVE</th><th>PERFIL</th><th>SUELDO</th><th>FOTO</th><th>ACCIONES</th>
                            </tr>`;
                        if(prod_obj_array.length < 1){
                            tabla += `<tr><td>---</td><td>---</td><td>---</td><td>---</td>
                                <td>---</td></tr>`;
                        }
                        else {
                            prod_obj_array.forEach((dato: any) => {
                                if(dato !== null){
                                    tabla += `<tr><td>${dato.id}</td><td>${dato.nombre}</td><td>${dato.correo}</td><td>------</td><td>${dato.id_perfil}</td><td>${dato.sueldo}</td>
                                                    <td><img src="${this.url}${dato.foto}" width="50px" hight="50px"></td>
                                                    <td><button type="button" class="btn btn-info" id="" 
                                                    data-obj='${JSON.stringify(dato)}' name="btnModificar">
                                                    <span class="bi bi-pencil"></span>
                                                </button>
                                                <button type="button" class="btn btn-danger" id="" 
                                                    data-id='${dato.id}' name="btnEliminar">
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
                    (<HTMLInputElement>document.getElementById("sueldo")).value = obj_dato.sueldo;
                    (<HTMLInputElement>document.getElementById("imgFoto")).src = this.url + obj_dato.foto;
                    (<HTMLDivElement>document.getElementById("imgFoto")).style.display = "block";
                    (<HTMLInputElement>document.getElementById("id")).readOnly = true;
    
                    ///let btn = (<HTMLInputElement>document.getElementById("btn-modificar"));
                    
                    //btn.onclick = ()=> this.ModificarUsuarioBD();
                });
            });
    
            document.getElementsByName("btnEliminar").forEach((boton)=>{
    
                boton.addEventListener("click", ()=>{ 

                    let id : any = boton.getAttribute("data-id");
                    
                    if(confirm(`¿Seguro de eliminar el empleado con id ${id}?`)){
                       
                        this.EliminarEmpleadoBD(id);
                    }                   
                });
            });  
            (<HTMLInputElement>document.getElementById("id")).readOnly = false;  
        }
        public static async AgregarEmpleadoBD() {

            // Obtener los elementos del formulario
            const nombre =  (<HTMLInputElement>document.getElementById("nombre")).value;
            const correo =  (<HTMLInputElement>document.getElementById("correo")).value;
            const clave =  (<HTMLInputElement>document.getElementById("clave")).value;
            const id_perfil =  (<HTMLInputElement>document.getElementById("cboPerfiles")).value;
            const sueldo =  (<HTMLInputElement>document.getElementById("sueldo")).value;
            const foto:any =  (<HTMLInputElement>document.getElementById("foto"));

            // Crear el objeto usuario
            const empleado = {
                "nombre" : nombre,
                "correo" : correo,
                "clave" : clave,
                "id_perfil" : id_perfil,
                "sueldo" : sueldo
            };
            let form : FormData = new FormData();
            form.append('foto', foto.files[0]);
            form.append('obj_empleado', JSON.stringify(empleado));
            
            // Definir las opciones para la solicitud fetch
            const opciones = {
                method: "POST",
                body: form,

            };
            // Definir la respuesta por default
            let respuesta = {
                "exito": false,
                "mensaje": "No se pudo agregar correctamente el usuario",
            };
            
            try {
                // Enviar la solicitud POST usando manejadorFetch
                let response = await this.manejadorFetch(this.url + "empleadoBD", opciones);

                let resCadena = await response.text(); 
            
                // Informar por consola y alert
                console.log("Agregar: ", resCadena);
                
                //Modificar la respuesta
                respuesta = {
                    exito: true,
                    mensaje: "Se agrego correctamente el empleado",
                };
                this.Success();
            
            } catch (error:any) {
                this.Fail(error);
                
            }
            alert(respuesta.mensaje);
            return respuesta;
        }
        public static async ModificarEmpleadoBD() {

            // Obtener los elementos del formulario
            const nombre = (<HTMLInputElement>document.getElementById("nombre")).value;
            const correo = (<HTMLInputElement>document.getElementById("correo")).value;
            const clave = (<HTMLInputElement>document.getElementById("clave")).value;
            const id_perfil = (<HTMLInputElement>document.getElementById("cboPerfiles")).value;
            const sueldo = (<HTMLInputElement>document.getElementById("sueldo")).value;
            const id = (<HTMLInputElement>document.getElementById("id")).value;
            const foto:any = (<HTMLInputElement>document.getElementById("foto"));

            // Crear el objeto empleado
            const empleado = {
            "nombre": nombre,
            "correo": correo,
            "clave": clave,
            "id_perfil": id_perfil,
            "sueldo": sueldo,
            "foto" : foto
            };

            // Definir la respuesta por default
            let respuesta = {
                "exito": false,
                "mensaje": "NO pudo ser modificado correctamente"
            };

            // Crear un FormData para enviar el JSON y la foto
            const formData = new FormData();
            formData.append('foto', foto.files[0]);
            formData.append('empleado_json', JSON.stringify(empleado));

               
            const opciones = {
                method: "PUT",
                body: formData,
            };
    
            try {
    
                let response = await this.manejadorFetch(this.url + "empleadoBD/" + id, opciones);
                
                const resJson = await response.json();
                
                console.log("Modificar: ", resJson);
                if (resJson.exito) {
                    alert("Se ha modificado correctamente");
                    respuesta = {
                        exito: true,
                        mensaje: "Se modificó correctamente el empleado",
                    };
                    this.Success();
                } else {
                    alert("Error al modificar: " + resJson.mensaje);
                }
   
                this.Success();
    
            } catch (err:any) {
            
                this.Fail(err);
            }
            return respuesta;
        }
        public static async EliminarEmpleadoBD(id : any) {

            const opciones = {
                method: "DELETE",
                headers: {"Accept": "*/*", "Content-Type": "application/json"},
            };
           
            // Definir la respuesta por default
            let respuesta = {
                "exito": false,
                "mensaje": "NO pudo ser modificado correctamente"
            };
    
            try {
    
                let res = await this.manejadorFetch(this.url + "empleadoBD/" + id, opciones);
            
                let resCadena = await res.text(); 

                respuesta = {
                    "exito": true,
                    "mensaje": "Pudo ser eliminado correctamente"
                };
                
                console.log("Eliminar: ", resCadena);
    
                this.Success();
    
            } catch (err:any) {
            
                this.Fail(err);
            }
            alert(respuesta.mensaje);
            return respuesta;
        }
            
        // ########### FAIL - SUCCESS  ############

        public static Fail(retorno:string):void {

            console.error(retorno);
            alert("Ha ocurrido un ERROR!!!");
        }
        public static Success() {
        
            this.MostrarEmpleadosBD();
    
            this.LimpiarForm();
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

