export interface Bolsa {
    valor: number;
    bancoPagamento: string;
    numeroAgencia: string;
    numeroContaCorrente: string;
}

export interface FormData {
    nome: string;
    cpf: string;
    telefone: string;
    sexo: 'masculino' | 'feminino';
    modalidadeEnsino: string;
    curso: string;
    projetoVinculado: string;
    tipoVinculo: string;
    bolsa: Bolsa;
    email: string;
    senha: string;
}