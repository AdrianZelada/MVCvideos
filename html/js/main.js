/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//jalamos los datos de la base de datos;
refresh();

// configuracion del input text "duracion" 
// para que solo acepte valores numericos

$('#duracion').numeric({
    decimal:false,
    negative:false
});
stock.onclick=function(e){    
    //Mandamos los datos a las Vista para q los coloque devidamente
    stock_hidden();
    create_Table();    
}

actualizar.onclick=function(){
  //actualizar en la base de datos .... enviamos a una Api q creamos .          
    $('#imagen').upload('../routes.php',{

        controller:'upload_Image',
        name_file:$("#name_image").val()

    },function(resp){ 
        Ajax_add_upload('edit_item',resp);
    });

    menu_show();
    refresh();
}

eliminar.onclick=function(){
    //Oculta la vista de Actuzlizar los datos              

    // SWAL  una libreria q ayuda a mejores mensajes
    swal({  
        title: "Esta Seguro!?",
        text: "El Video se borrara de su lista",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Si, Borralo!",
        cancelButtonText: "No, Lo Borres!",
        closeOnConfirm: false,
        closeOnCancel: false 
        },function(isConfirm){
            if (isConfirm) {
                swal("Borrando!", "EL video a sido Borrado con Exito!!!", "success");                
                Ajax_delete();
                refresh();
                menu_show();
            }else{
                swal("Cancelado!", "Hemos logrado salvar su video :)", "error");
            }
        });
}

agregar.onclick=function(){

    // mandamos un objeto vacio a New form
    newForm({   id:'',
            Titulo:"",
            Categoria:"",
            Director:"",
            Duracion:"",
            Stock:"",
            Image:""
        });       

    mod_show();
    refresh();

    Action_buttons("add");
};

Add.onclick=function(){       
//  Manda los datos ../routes.php donde se agragaran a la  base de datos
    if(Validate_form()==true){        
        $('#imagen').upload('../routes.php',{
            controller:'upload_Image',
            name_file:$("#name_image").val()
        },function(resp){               
            Ajax_add_upload('add_item',resp);
            menu_show();
        });           
    }else{
        swal("Error!", "Le falta llenar algun campo -_- ☻ ", "error");
    }    
};

$('.on_back').click(function(){
    // regreso a la vista inicial
    menu_show();
    refresh();
});

$('#imagen').on('change',function(){

    // Hacemos la previsualizacion de la imagen
    var url=$('#imagen').val().split("\u005C");
    document.getElementById('name_image').value=url[url.length-1].split(".")[0];    
    window.mostrarVistaPrevia();
});


var newForm=function(obj_video){    

    // llenamos el formulario con los datos q nos mandaron
    mod_show();
    var image_url=obj_video.Image.split("/");
    document.getElementById('titulo').value=obj_video.Titulo ;
    document.getElementById('categoria').value=obj_video.Categoria;
    document.getElementById('director').value=obj_video.Director;
    document.getElementById('duracion').value=obj_video.Duracion;   
    document.getElementById('name_image').value=image_url[image_url.length-1].split(".")[0]; 
    document.getElementById('title_image').src=obj_video.Image;
};

var create_Table=function(){
    
    // creamos la tabla con todos los datos q nos mandaron
    $(Content_stock).empty();
    var Campos=["Titulo","Director","Categoria","Duracion"];       
    Content_stock.hidden=false;
   
    Campos.forEach(function(value,index){  
        var color="title"
        Content_stock.innerHTML=Content_stock.innerHTML+block(value,color);
    });
    Content_stock.innerHTML=Content_stock.innerHTML+'<br>';
    Camp.forEach(function(value,index){    
        var contentBlock=$(Content_blocks(value));        
        for(val in value){
            if(val!='id'&& val!="Image"){                     
                contentBlock.append(block(value[val]));
            }            
        }        
        $(Content_stock).append(contentBlock);   
        $(Content_stock).append('<br><br>');   
    });
        
};

var Content_blocks=function(object_Value){
    // registros de la tabla donde ponemos las funciones adecuadas
    var contentBlock=document.createElement('div');

    var moveLeft = 0;
    var moveDown = 0;

    contentBlock.id=object_Value['id'];
    contentBlock.className="click_block";    
    $(contentBlock).click(function(){
        _id=object_Value['id'];        
        newForm(object_Value);
        Action_buttons("update");
    })

    $(contentBlock).mousemove(function(e) {
          $("div#pop-up").css('top', e.pageY + moveDown).css('left', e.pageX + moveLeft);
        });

    $(contentBlock).hover(function(e) {
            $('#pop_up_image').attr({'src':object_Value['Image']});
            $('div#pop-up').show();
        
        }, function() {
            $('div#pop-up').hide();
        });

    return $(contentBlock);
}

var block=function(text,color){
    // creamos el bloque que contiene cada uno de los items
    var Class= color!="title" ? "block" : "block_title"; 
   return '<div class="'+Class+'">'+text+'</div>' 
}

function stock_hidden(){
    //oculta el Stock
    $(parent_content_stock).show(500);    
    $(menu).hide(500);
}

function menu_show(){
    // hace aparecer el menu de Inicio
    $(parent_content_stock).hide(500);
    $(Content_mod).hide(500);
    $(menu).show(500);
}

function mod_show(){
    //queda visible el modulo de actualizacion o agregar;
    $(parent_content_stock).hide(500);
    $(Content_mod).show(500);
    $(menu).hide(500);
}

function fill_object(exten){

    //llena el objeto ;
    var newObject={    
            id:_id,          
            Titulo:$('#titulo').val(),
            Categoria:$('#categoria').val(),
            Director:$('#director').val(),
            Duracion:$('#duracion').val(),            
            Image:"../uploads/"+$("#name_image").val()+"."+exten
        };
    return newObject;            
}

function Action_buttons(action){
    switch (action){
        case "add":
            $(actualizar).addClass("disable_button");
            $(eliminar).addClass("disable_button");
            $(Add).removeClass("disable_button");
            $(actualizar).attr("disabled", true);
            $(eliminar).attr("disabled", true);
            $(Add).attr("disabled", false);
        break;
        case "update":
            $(Add).addClass("disable_button");
            $(actualizar).removeClass("disable_button");
            $(eliminar).removeClass("disable_button");
            $(actualizar).attr("disabled", false);
            $(eliminar).attr("disabled", false);
            $(Add).attr("disabled", true);
        break;
    }    
}

function Validate_form(){
    var items=['titulo','categoria','director','duracion','title_image'];    
    var count=0
    items.forEach(function(value,index){      
        if(document.getElementById(value).value == ""){
            count++
        }
    });    
    if(count>0){
        return false;
    }else{
        return true;
    }
}

