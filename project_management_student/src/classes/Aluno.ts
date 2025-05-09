import { AlunoProps, Bolsa } from '../types/alunos';

class Aluno implements AlunoProps {
    private _nome: string;
    private _matricula: string;
    private _curso: string;
    private _departamento: string;
    private _projeto: string;
    private _coordenador: string;
    private _frequencia: number;
    private _relatoriosEnviados: number[];
    private _bolsas: Bolsa[];
    private _valorBolsa: number;
    private _horasPorSemana: number;

    constructor({
        nome,
        matricula,
        curso,
        departamento,
        projeto,
        coordenador,
        frequencia,
        relatoriosEnviados,
        bolsas,
        valorBolsa,
        horasPorSemana
    }: AlunoProps) {
        this._nome = nome;
        this._matricula = matricula;
        this._curso = curso;
        this._departamento = departamento;
        this._projeto = projeto;
        this._coordenador = coordenador;
        this._frequencia = frequencia;
        this._relatoriosEnviados = relatoriosEnviados;
        this._bolsas = bolsas;
        this._valorBolsa = valorBolsa;
        this._horasPorSemana = horasPorSemana;
    }

    // Getters e Setters com validação
    get nome(): string {
        return this._nome;
    }

    set nome(valor: string) {
        if (!valor || valor.trim().length === 0) {
            throw new Error('Nome não pode estar vazio');
        }
        this._nome = valor.trim();
    }

    get matricula(): string {
        return this._matricula;
    }

    set matricula(valor: string) {
        if (!valor || valor.trim().length === 0) {
            throw new Error('Matrícula não pode estar vazia');
        }
        this._matricula = valor.trim();
    }

    get curso(): string {
        return this._curso;
    }

    set curso(valor: string) {
        if (!valor || valor.trim().length === 0) {
            throw new Error('Curso não pode estar vazio');
        }
        this._curso = valor.trim();
    }

    get departamento(): string {
        return this._departamento;
    }

    set departamento(valor: string) {
        if (!valor || valor.trim().length === 0) {
            throw new Error('Departamento não pode estar vazio');
        }
        this._departamento = valor.trim();
    }

    get projeto(): string {
        return this._projeto;
    }

    set projeto(valor: string) {
        if (!valor || valor.trim().length === 0) {
            throw new Error('Projeto não pode estar vazio');
        }
        this._projeto = valor.trim();
    }

    get coordenador(): string {
        return this._coordenador;
    }

    set coordenador(valor: string) {
        if (!valor || valor.trim().length === 0) {
            throw new Error('Coordenador não pode estar vazio');
        }
        this._coordenador = valor.trim();
    }

    get frequencia(): number {
        return this._frequencia;
    }

    set frequencia(valor: number) {
        if (valor < 0 || valor > 100) {
            throw new Error('Frequência deve estar entre 0 e 100');
        }
        this._frequencia = valor;
    }

    get relatoriosEnviados(): number[] {
        return this._relatoriosEnviados;
    }

    set relatoriosEnviados(valor: number[]) {
        if (!Array.isArray(valor)) {
            throw new Error('Relatórios enviados deve ser um array');
        }
        this._relatoriosEnviados = valor;
    }

    get bolsas(): Bolsa[] {
        return this._bolsas;
    }

    set bolsas(valor: Bolsa[]) {
        if (!Array.isArray(valor)) {
            throw new Error('Bolsas deve ser um array');
        }
        this._bolsas = valor;
    }

    get valorBolsa(): number {
        return this._valorBolsa;
    }

    set valorBolsa(valor: number) {
        if (valor < 0) {
            throw new Error('Valor da bolsa não pode ser negativo');
        }
        this._valorBolsa = valor;
    }

    get horasPorSemana(): number {
        return this._horasPorSemana;
    }

    set horasPorSemana(valor: number) {
        if (valor < 0 || valor > 40) {
            throw new Error('Horas por semana deve estar entre 0 e 40');
        }
        this._horasPorSemana = valor;
    }

    adicionarRelatorio(): void {
        this._relatoriosEnviados.push(this._relatoriosEnviados.length + 1);
    }

    calcularMediaFrequencia(): number {
        return this._frequencia / 100;
    }

    listarBolsasAtivas(): Bolsa[] {
        return this._bolsas.filter(bolsa => bolsa.valor > 0);
    }
}

export { Aluno };