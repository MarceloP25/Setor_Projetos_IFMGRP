class Aluno {
    constructor(nome, matricula, curso, departamento, projeto, coordenador, frequencia, relatoriosEnviados, bolsas, valorBolsa, horasPorSemana) {
        this.nome = nome
        this.matricula = matricula
        this.curso = curso
        this.departamento = departamento
        this.projeto = projeto
        this.coordenador = coordenador
        this.frequencia = frequencia
        this.relatoriosEnviados = relatoriosEnviados
        this.bolsas = bolsas
        this.valorBolsa = valorBolsa
        this.horasPorSemana = horasPorSemana
    }

    // Nome
    setNome = (nome) => { this.nome = nome }
    getNome = () => { return this.nome }

    // Matrícula
    setMatricula = (matricula) => { this.matricula = matricula }
    getMatricula = () => { return this.matricula }

    // Curso
    setCurso = (curso) => { this.curso = curso }
    getCurso = () => { return this.curso }

    // Departamento
    setDepartamento = (departamento) => { this.departamento = departamento }
    getDepartamento = () => { return this.departamento }

    // Projeto
    setProjeto = (projeto) => { this.projeto = projeto }
    getProjeto = () => { return this.projeto }

    // Coordenador
    setCoordenador = (coordenador) => { this.coordenador = coordenador }
    getCoordenador = () => { return this.coordenador }

    // Frequência
    setFrequencia = (frequencia) => { this.frequencia = frequencia }
    getFrequencia = () => { return this.frequencia }

    // Relatórios Enviados
    setRelatoriosEnviados = (relatoriosEnviados) => { this.relatoriosEnviados = relatoriosEnviados }
    getRelatoriosEnviados = () => { return this.relatoriosEnviados }

    // Bolsas
    setBolsas = (bolsas) => { this.bolsas = bolsas }
    getBolsas = () => { return this.bolsas }

    // Valor da Bolsa
    setValorBolsa = (valorBolsa) => { this.valorBolsa = valorBolsa }
    getValorBolsa = () => { return this.valorBolsa }

    // Horas por semana
    setHorasPorSemana = (horasPorSemana) => { this.horasPorSemana = horasPorSemana }
    getHorasPorSemana = () => { return this.horasPorSemana }
}

export { Aluno }
