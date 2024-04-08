const express = require("express")
const app = express()
const post = require("./models/post")
const handleBars = require("express-handlebars").engine
const bodyParser = require("body-parser")

app.engine("handlebars", handleBars({
    defaultLayout: "main"
}))

app.set("view engine", "handlebars")

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: false
}))

app.listen(8081, function(){
    console.log("Servidor Ativo!")
})

app.get("/", function(req, res){
    res.render("primeira_pagina")
})

app.post("/cadastrar", function(req, res){
    post.create({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado,
        telefone: req.body.telefone
    }).then(function(){
        res.redirect("/")
    }).catch(function(erro){
        console.log("Erro ao cadastrar os dados! Erro: " + erro)
    })
})

app.get("/consulta", function(req, res){
    post.findAll().then(function(post){
        res.render("consulta", {post})
    }).catch(function(erro){
        console.log("Erro ao listar dados do sistema! Erro: " + erro)
    })
})

app.get("/editar/:id", function(req, res){
    post.findAll({
        where: {'id': req.params.id}
    }).then(function(post){
        res.render("editar", {post})
    }).catch(function(erro){
        console.log("Erro ao listar registro específico! Erro: " + erro)
    })
})

app.post("/atualizar", function(req, res){
    post.update({
        nome: req.body.nome,
        telefone: req.body.telefone
    }, {
        where: {
            id: req.body.id
        }
    }).then(function(){
        res.redirect("/consulta")
    }).catch(function(erro){
        console.log("Erro ao atualizar os dados! Erro: " + erro)
    })
})

app.get("/excluir/:id", function(req, res){
    post.destroy({
        where: {'id': req.params.id}
    }).then(function(){
        res.redirect("/consulta")
    }).catch(function(erro){
        console.log("Erro ao excluir os dados! Erro: " + erro)
    })
})