class Avaliador {
    constructor(nome, email, campusOrigem, areaTematica, linhasExtensao, edital, projetosAvaliados) {
        this.nome = nome
        this.email = email
        this.campusOrigem = campusOrigem
        this.areaTematica = areaTematica
        this.linhasExtensao = linhasExtensao
        this.edital = edital
        this.projetosAvaliados = projetosAvaliados
    }

    // Nome
    setNome = (nome) => { this.nome = nome }
    getNome = () => { return this.nome }

    // Email
    setEmail = (email) => { this.email = email }
    getEmail = () => { return this.email }

    // Campus de Origem
    setCampusOrigem = (campusOrigem) => { this.campusOrigem = campusOrigem }
    getCampusOrigem = () => { return this.campusOrigem }

    // Área Temática de Interesse
    setAreaTematica = (areaTematica) => { this.areaTematica = areaTematica }
    getAreaTematica = () => { return this.areaTematica }

    // Linhas de Extensão
    setLinhasExtensao = (linhasExtensao) => { this.linhasExtensao = linhasExtensao }
    getLinhasExtensao = () => { return this.linhasExtensao }

    // Edital
    setEdital = (edital) => { this.edital = edital }
    getEdital = () => { return this.edital }

    // ProjetosAvaliados
    setProjetosAvaliados = (projetosAvaliados) => { this.projetosAvaliados = projetosAvaliados }
    getProjetosAvaliados = () => { return this.projetosAvaliados }
}

export { Avaliador }
