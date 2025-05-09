export interface Bolsa {
    valor: number;
    horasPorSemana: number;
}

export interface AlunoProps {
    nome: string;
    matricula: string;
    curso: string;
    departamento: string;
    projeto: string;
    coordenador: string;
    frequencia: number;
    relatoriosEnviados: number[];
    bolsas: Bolsa[];
    valorBolsa: number;
    horasPorSemana: number;
}