namespace Modelo
{
    export class ManejadoraEmpleado {

        private static url:string = "http://localhost:2024/empleadoBD";
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

        public static async MostrarEmpleados(){

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

                let res = await this.manejadorFetch(this.url, opciones);
        
                let resJSON = await res.json()

                this.MostrarListadoEmpleado(resJSON);
           
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
        public static MostrarListadoEmpleado(data:any):void {

            let prod_obj_array: any[] = data.usuarios;
    
            //console.log("Mostrar: ", prod_obj_array);
    
            let div = <HTMLDivElement>document.getElementById("divTablaEmpleados");
    
            let tabla = `<table class="table table-hover">
                            <tr>
                                <th>ID</th><th>NOMBRE</th><th>CORREO</th><th>CLAVE</th><th>PERFIL</th><th>SULDO</th><th>FOTO</th><th>ACCIONES</th>
                            </tr>`;
                        if(prod_obj_array.length < 1){
                            tabla += `<tr><td>---</td><td>---</td><td>---</td><td>---</td>
                                <td>---</td></tr>`;
                        }
                        else {
                            prod_obj_array.forEach((dato: any) => {
                                if(dato !== null){
                                    tabla += `<tr><td>${dato.id}</td><td>${dato.nombre}</td><td>${dato.correo}</td><td>${dato.clave}</td><td>${dato.id_perfil}</td><td>${dato.sueldo}</td>
                                                    <td><img src="${"./usr_default.jpg"}" width="50px" hight="50px"></td>
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
                    (<HTMLInputElement>document.getElementById("id")).readOnly = true;
    
                    //let btn = (<HTMLInputElement>document.getElementById("btn-modificar"));
                    
                    //btn.onclick = ()=> this.ModificarUsuarioBD();
                });
            });
    
            document.getElementsByName("btnEliminar").forEach((boton)=>{
    
                boton.addEventListener("click", ()=>{ 

                    let id : any = boton.getAttribute("data-id");
                    
                    if(confirm(`¿Seguro de eliminar producto con id ${id}?`)){
                       
                        //this.EliminarEmpleado(id);
                    }                   
                });
            });  
            (<HTMLInputElement>document.getElementById("id")).readOnly = false;  
        }
    
        
        // ########### FAIL - SUCCESS  ############

        public static Fail(retorno:string):void {

            console.error(retorno);
            alert("Ha ocurrido un ERROR!!!");
        }
        public static Success() {
        
            this.MostrarEmpleados();
    
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

