import { json, request, response } from "express";
import Usuario from "../models/Usuarios.js";
import generarJWT from "../helpers/generarJWT.js";

//Metodo para poder registrar un documento
const registrar = async (request,response)=>{
    //Evitar documentos duplicados
    const {email} = request.body
    const existeUsuario = await Usuario.findOne({email})

    console.log(existeUsuario)
    if (existeUsuario){
        const error = new Error("El usuario ya esta registrado")
        return response.status(404).json({msg:error.message})
    }

    //Try para verificar que se guarde el documento
    try {
        const usuario = new Usuario(request.body)
        const usuarioAlmacenado = await usuario.save()
        response.json(usuarioAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

//Metodo para poder autenticar a un usuario
const autenticar = async (request,response)=>{
    //Comprobar is el usuario existe
    const {email,password}=request.body
    const usuario = await Usuario.findOne({email})
    //response.json(usuario)
    if(!usuario){
        const error = new Error("Usuario no existe")
        return response.status(403).json({msg:error.message})
    }
    //Comprobar el passwod del usuario
    if (await usuario.comprobarPassword(password)){
        return response.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email:usuario.email,
            token:generarJWT(usuario._id,usuario.nombre)
        })
    }else{
        return response.json({msg:"Password incorrecto"})
    }
}


const perfil = async (request,response) =>{
    const {usuario} = request
    response.json(usuario)
}

export{
    registrar,
    autenticar,
    perfil
}