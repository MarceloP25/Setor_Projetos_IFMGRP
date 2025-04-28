class Projeto {
    constructor(
        edital,
        nomeProjeto,
        ano,
        periodoInicio,
        periodoFim,
        abrangencia,
        nomeAcao,
        coordenador,
        emailCoordenador,
        coCoordenador,
        emailCoCoordenador,
        publicoInterno,
        qtdPublicoInterno,
        publicoExterno,
        qtdPublicoExterno,
        estado,
        municipio,
        bairro,
        espacoRealizacao,
        valorFinanciamento,
        modalidades,
        numeroBolsas,
        areaTematica,
        linhaExtensao,
        detalhesAcao,
        classificado,
        avaliadores,
        alunos
    ) {
        this.edital = edital;
        this.nomeProjeto = nomeProjeto;
        this.ano = ano;
        this.periodoInicio = periodoInicio;
        this.periodoFim = periodoFim;
        this.abrangencia = abrangencia;
        this.nomeAcao = nomeAcao;
        this.coordenador = coordenador;
        this.emailCoordenador = emailCoordenador;
        this.coCoordenador = coCoordenador;
        this.emailCoCoordenador = emailCoCoordenador;
        this.publicoInterno = publicoInterno;
        this.qtdPublicoInterno = qtdPublicoInterno;
        this.publicoExterno = publicoExterno;
        this.qtdPublicoExterno = qtdPublicoExterno;
        this.estado = estado;
        this.municipio = municipio;
        this.bairro = bairro;
        this.espacoRealizacao = espacoRealizacao;
        this.valorFinanciamento = valorFinanciamento;
        this.modalidades = modalidades || {
            sup1: false,
            sup2: false,
            bexmed: false,
            bexcol: false
        };
        this.numeroBolsas = numeroBolsas;
        this.areaTematica = areaTematica;
        this.linhaExtensao = linhaExtensao || [];
        this.detalhesAcao = detalhesAcao;
        this.classificado = classificado || false;
        this.avaliadores = avaliadores || [];
        this.alunos = alunos || [];
    }

    // Getters e Setters
    setEdital = (edital) => this.edital = edital;
    getEdital = () => this.edital;

    setNomeProjeto = (nomeProjeto) => this.nomeProjeto = nomeProjeto;
    getNomeProjeto = () => this.nomeProjeto;

    setAno = (ano) => this.ano = ano;
    getAno = () => this.ano;

    setPeriodoInicio = (periodoInicio) => this.periodoInicio = periodoInicio;
    getPeriodoInicio = () => this.periodoInicio;

    setPeriodoFim = (periodoFim) => this.periodoFim = periodoFim;
    getPeriodoFim = () => this.periodoFim;

    setAbrangencia = (abrangencia) => this.abrangencia = abrangencia;
    getAbrangencia = () => this.abrangencia;

    setNomeAcao = (nomeAcao) => this.nomeAcao = nomeAcao;
    getNomeAcao = () => this.nomeAcao;

    setCoordenador = (coordenador) => this.coordenador = coordenador;
    getCoordenador = () => this.coordenador;

    setEmailCoordenador = (email) => this.emailCoordenador = email;
    getEmailCoordenador = () => this.emailCoordenador;

    setCoCoordenador = (co) => this.coCoordenador = co;
    getCoCoordenador = () => this.coCoordenador;

    setEmailCoCoordenador = (email) => this.emailCoCoordenador = email;
    getEmailCoCoordenador = () => this.emailCoCoordenador;

    setPublicoInterno = (valor) => this.publicoInterno = valor;
    getPublicoInterno = () => this.publicoInterno;

    setQtdPublicoInterno = (qtd) => this.qtdPublicoInterno = qtd;
    getQtdPublicoInterno = () => this.qtdPublicoInterno;

    setPublicoExterno = (valor) => this.publicoExterno = valor;
    getPublicoExterno = () => this.publicoExterno;

    setQtdPublicoExterno = (qtd) => this.qtdPublicoExterno = qtd;
    getQtdPublicoExterno = () => this.qtdPublicoExterno;

    setEstado = (estado) => this.estado = estado;
    getEstado = () => this.estado;

    setMunicipio = (municipio) => this.municipio = municipio;
    getMunicipio = () => this.municipio;

    setBairro = (bairro) => this.bairro = bairro;
    getBairro = () => this.bairro;

    setEspacoRealizacao = (espaco) => this.espacoRealizacao = espaco;
    getEspacoRealizacao = () => this.espacoRealizacao;

    setValorFinanciamento = (valor) => this.valorFinanciamento = valor;
    getValorFinanciamento = () => this.valorFinanciamento;

    setModalidades = (modalidades) => this.modalidades = modalidades;
    getModalidades = () => this.modalidades;

    setNumeroBolsas = (numero) => this.numeroBolsas = numero;
    getNumeroBolsas = () => this.numeroBolsas;

    setAreaTematica = (area) => this.areaTematica = area;
    getAreaTematica = () => this.areaTematica;

    setLinhaExtensao = (linhas) => this.linhaExtensao = linhas;
    getLinhaExtensao = () => this.linhaExtensao;

    setDetalhesAcao = (detalhes) => this.detalhesAcao = detalhes;
    getDetalhesAcao = () => this.detalhesAcao;

    setClassificado = (valor) => this.classificado = valor;
    getClassificado = () => this.classificado;

    addAvaliador = (avaliador) => this.avaliadores.push(avaliador);
    getAvaliadores = () => this.avaliadores;

    addAlunos = (alunos) => this.alunos.push(alunos);
    getAlunos = () => this.alunos;
}

export { Projeto };
