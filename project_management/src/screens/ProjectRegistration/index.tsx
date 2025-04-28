import React, { useState } from 'react';
import { db } from '../../firebase/firebaseUtil';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import './styles.css';

interface FormData {
    edital: string;
    nomeProjeto: string;
    ano: string;
    periodoInicio: string;
    periodoFim: string;
    abrangencia: string;
    nomeAcao: string;
    nomeCoordenador: string;
    emailCoordenador: string;
    nomeCoCoordenador: string;
    emailCoCoordenador: string;
    publicoInterno: string;
    qtdInterno: string;
    publicoExterno: string;
    qtdExterno: string;
    estado: string;
    municipio: string;
    bairro: string;
    espaco: string;
    financiamento: string;
    totalBolsas: string;
    tipoBolsas: string[];
    areaTematica: string;
    linhaExtensao: string;
    detalhes: string;
    classificado: string;
    avaliador1: string;
    avaliador2: string;
    avaliador3: string;
}

const formatMoney = (value: string): string => {
    // Remove todos os caracteres que não são dígitos
    const cleanValue = value.replace(/[^0-9]/g, '');
    
    // Se o valor estiver vazio ou for zero, retorna R$ 0,00
    if (!cleanValue || cleanValue === '0') {
        return 'R$ 0,00';
    }

    // Converte para número e formata
    const number = parseFloat(cleanValue) / 100;
    return `R$ ${number.toFixed(2).replace('.', ',')}`;
};

const sanitizeName = (name: string): string => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
};

const ProjectRegistration: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        edital: '',
        nomeProjeto: '',
        ano: '',
        periodoInicio: '', 
        periodoFim: '',    
        abrangencia: '',
        nomeAcao: '',
        nomeCoordenador: '',
        emailCoordenador: '',
        nomeCoCoordenador: '', 
        emailCoCoordenador: '',
        publicoInterno: '',
        qtdInterno: '',
        publicoExterno: '',
        qtdExterno: '',
        estado: '',
        municipio: '',
        bairro: '',
        espaco: '',
        financiamento: 'R$ 0,00',
        totalBolsas: '',
        tipoBolsas: [],
        areaTematica: '',
        linhaExtensao: '',
        detalhes: '',
        classificado: '',
        avaliador1: '',
        avaliador2: '',
        avaliador3: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'bolsas') {
            setFormData(prev => {
                const isSelected = prev.tipoBolsas.includes(value);
                const newTipoBolsas = isSelected
                    ? prev.tipoBolsas.filter(item => item !== value)
                    : [...prev.tipoBolsas, value];

                return {
                    ...prev,
                    tipoBolsas: newTipoBolsas,
                    totalBolsas: newTipoBolsas[newTipoBolsas.length - 1] || ''
                };
            });
        } else if (name === 'financiamento') {
            const formattedValue = formatMoney(value);
            setFormData(prev => ({ ...prev, financiamento: formattedValue }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const validateForm = (): boolean => {
        const requiredFields = [
            'edital',
            'nomeProjeto',
            'nomeCoordenador',
            'emailCoordenador',
            'financiamento',
            'areaTematica',
            'linhaExtensao',
        ];

        for (const field of requiredFields) {
            if (!formData[field]) {
                alert(`O campo ${field} é obrigatório!`);
                return false;
            }
        }

        if (!formData.nomeProjeto.replace(/\s/g, '').length) {
            alert('Nome do projeto inválido para ID!');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const rawFinanciamento = formData.financiamento.replace(/\\D/g, '');
                const projetoId = sanitizeName(formData.nomeProjeto);
                
                await setDoc(doc(db, "projetos", projetoId), {
                    ...formData,
                    financiamento: rawFinanciamento,
                    createdAt: new Date()
                });

                alert('Projeto cadastrado com sucesso!');
                setFormData({
                    edital: '',
                    nomeProjeto: '',
                    ano: '',
                    periodoInicio: '', 
                    periodoFim: '',    
                    abrangencia: '',
                    nomeAcao: '',
                    nomeCoordenador: '',
                    emailCoordenador: '',
                    nomeCoCoordenador: '', 
                    emailCoCoordenador: '',
                    publicoInterno: '',
                    qtdInterno: '',
                    publicoExterno: '',
                    qtdExterno: '',
                    estado: '',
                    municipio: '',
                    bairro: '',
                    espaco: '',
                    financiamento: 'R$ 0,00',
                    totalBolsas: '',
                    tipoBolsas: [],
                    areaTematica: '',
                    linhaExtensao: '',
                    detalhes: '',
                    classificado: '',
                    avaliador1: '',
                    avaliador2: '',
                    avaliador3: ''
                });
            } catch (error) {
                if (error.code === 'already-exists') {
                    alert('Já existe um projeto com este nome!');
                } else {
                    alert('Erro ao cadastrar projeto: ' + error.message);
                }
            }
        }
    };

    return (
        <div className="container">
            <div className="sidebar">
                <h2>Visão Geral</h2>
                <ul className="sidebar-menu">
                    <li className="active">Projetos</li>
                    <li>Orçamentos</li>
                </ul>
            </div>

            <div className="main-content">
                <div className="header">
                    <h1>Setor de Projetos IFSMG - RP</h1>
                </div>

                <div className="form-container">
                    <div className="form-title">Cadastro de Projeto</div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Selecione o Edital</label>
                            <select
                                className="form-control"
                                name="edital"
                                value={formData.edital}
                                onChange={handleChange}
                            >
                                <option value="">Selecione o Edital</option>
                                <option value="Edital 01/2025">Edital 01/2025</option>
                                <option value="Edital 02/2025">Edital 02/2025</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Nome do Projeto</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nomeProjeto"
                                value={formData.nomeProjeto}
                                onChange={handleChange}
                                placeholder="Nome do Projeto"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-col">
                                <label className="form-label">Ano</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="ano"
                                    value={formData.ano}
                                    onChange={handleChange}
                                    placeholder="Ano"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-col">
                                    <label className="form-label">Período de Realização</label>
                                    <div className="period-container">
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="periodoInicio"
                                            value={formData.periodoInicio}
                                            onChange={handleChange}
                                        />
                                        <span className="period-separator">a</span>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="periodoFim"
                                            value={formData.periodoFim}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-col">
                                <label className="form-label">Nome do Coordenador</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nomeCoordenador"
                                    value={formData.nomeCoordenador}
                                    onChange={handleChange}
                                    placeholder="Nome do Coordenador"
                                />
                            </div>

                            <div className="form-col">
                                <label className="form-label">Email do Coordenador</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="emailCoordenador"
                                    value={formData.emailCoordenador}
                                    onChange={handleChange}
                                    placeholder="Email do Coordenador"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-col">
                                <label className="form-label">Nome do Co-coordenador</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nomeCoCoordenador"
                                    value={formData.nomeCoCoordenador}
                                    onChange={handleChange}
                                    placeholder="Nome do Co-coordenador"
                                />
                            </div>

                            <div className="form-col">
                                <label className="form-label">Email do Co-coordenador</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="emailCoCoordenador"
                                    value={formData.emailCoCoordenador}
                                    onChange={handleChange}
                                    placeholder="Email do Co-coordenador"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-col">
                                <label className="form-label">Valor solicitado para financiamento do Projeto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="financiamento"
                                    value={formData.financiamento}
                                    onChange={handleChange}
                                    placeholder="Financiamento"
                                />
                            </div>

                            <div className="form-col">
                                <label className="form-label">Tipos de bolsas solicitadas</label>
                                <div className="checkbox-group">
                                    {[
                                        { id: 'supi', value: 'SUP I (20h) - R$ 700,00', label: 'SUP I (20h) - R$ 700,00' },
                                        { id: 'supii', value: 'SUP II (10h) - R$ 350,00', label: 'SUP II (10h) - R$ 350,00' },
                                        { id: 'bexmed10', value: 'BEXMED (10h) - R$ 350,00', label: 'BEXMED (10h) - R$ 350,00' },
                                        { id: 'bexcol', value: 'BEXCOL (até 15h) - R$ 900,00', label: 'BEXCOL (até 15h) - R$ 900,00' }
                                    ].map((bolsa) => (
                                        <div key={bolsa.id} className="checkbox-option">
                                            <input
                                                type="checkbox"
                                                id={bolsa.id}
                                                name="bolsas"
                                                value={bolsa.value}
                                                checked={formData.tipoBolsas.includes(bolsa.value)}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor={bolsa.id}>{bolsa.label}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="form-section">
                            <div className="form-section-title">Área Temática</div>
                            <select
                                className="form-control"
                                name="areaTematica"
                                value={formData.areaTematica}
                                onChange={handleChange}
                            >
                                <option value="">Selecione a Área Temática</option>
                                <option value="Comunicação">Comunicação</option>
                                <option value="Cultura">Cultura</option>
                                <option value="Direitos Humanos e Justiça">Direitos Humanos e Justiça</option>
                                <option value="Educação">Educação</option>
                                <option value="Meio Ambiente">Meio Ambiente</option>
                                <option value="Saúde">Saúde</option>
                                <option value="Tecnologia e Produção">Tecnologia e Produção</option>
                                <option value="Trabalho">Trabalho</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Linha de Extensão</label>
                            <select
                                className="form-control"
                                name="linhaExtensao"
                                value={formData.linhaExtensao}
                                onChange={handleChange}
                            >
                                <option value="">Selecione a Linha de Extensão</option>
                                <option value="Alfabetizacao">Alfabetização, Leitura e Escrita</option>
                                <option value="Comunicacao">Comunicação Estratégica</option>
                                <option value="DesenvolvimentoRural">Desenvolvimento Rural e Questão Agrária</option>
                                <option value="Direitos">Direitos Individuais e Coletivos</option>
                                <option value="Emprego">Emprego e Renda</option>
                                <option value="Esporte">Esporte e Lazer</option>
                                <option value="FormacaoProfessores">Formação de Professores</option>
                                <option value="GestaoInstitucional">Gestão Institucional</option>
                                <option value="Infancia">Infância e Adolescência</option>
                                <option value="JovensAdultos">Jovens e Adultos</option>
                                <option value="Midiaartes">Mídiaartes</option>
                                <option value="Organizacoes">Organizações da Sociedade e Movimentos Sociais e Populares</option>
                                <option value="PropriedadeIntelectual">Propriedade Intelectual e Patente</option>
                                <option value="ResiduosSolidos">Resíduos Sólidos</option>
                                <option value="SaudeTrabalho">Saúde e Proteção no Trabalho</option>
                                <option value="SegurancaPublica">Segurança Pública e Defesa Social</option>
                                <option value="TerceiraIdade">Terceira Idade</option>
                                <option value="DesenvolvimentoProdutos">Desenvolvimento de Produtos</option>
                                <option value="DesenvolvimentoTecnologico">Desenvolvimento Tecnológico</option>
                                <option value="EducacaoProfissional">Educação Profissional</option>
                                <option value="EndemiasEpidemias">Endemias e Epidemias</option>
                                <option value="Estilismo">Estilismo</option>
                                <option value="GestaoTrabalho">Gestão do Trabalho</option>
                                <option value="GestaoPublica">Gestão Pública</option>
                                <option value="InovacaoTecnologica">Inovação Tecnológica</option>
                                <option value="LinguasEstrangeiras">Línguas Estrangeiras</option>
                                <option value="Midias">Mídias</option>
                                <option value="Patrimonio">Patrimônio Cultural, Histórico e Natural</option>
                                <option value="QuestoesAmbientais">Questões Ambientais</option>
                                <option value="SaudeAnimal">Saúde Animal</option>
                                <option value="SaudeHumana">Saúde Humana</option>
                                <option value="TecnologiaInformacao">Tecnologia da Informação</option>
                                <option value="UsoDrogas">Uso de Drogas e Dependência Química</option>
                                <option value="DesenvolvimentoRegional">Desenvolvimento Regional</option>
                                <option value="DesenvolvimentoUrbano">Desenvolvimento Urbano</option>
                                <option value="Empreendedorismo">Empreendedorismo</option>
                                <option value="DivulgacaoCientifica">Divulgação Científica e Tecnológica</option>
                                <option value="Farmacos">Fármacos e Medicamentos</option>
                                <option value="GestaoInformacional">Gestão Informacional</option>
                                <option value="GruposVulneraveis">Grupos Sociais Vulneráveis</option>
                                <option value="Jornalismo">Jornalismo</option>
                                <option value="Metodologias">Metodologias e Estratégias de Ensino/Aprendizagem</option>
                                <option value="Musica">Música</option>
                                <option value="PessoaDeficiencia">Pessoa com Deficiências, Incapacidades e Necessidades Especiais</option>
                                <option value="RecursosHidricos">Recursos Hídricos</option>
                                <option value="SaudeFamilia">Saúde da Família</option>
                                <option value="SegurancaAlimentar">Segurança Alimentar e Nutricional</option>
                                <option value="Turismo">Turismo</option>
                                <option value="DesenvolvimentoHumano">Desenvolvimento Humano</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <div className="form-col">
                                <div className="form-section-title">Classifique o Projeto</div>
                                <div className="radio-group">
                                    <div className="radio-option">
                                        <input
                                            type="radio"
                                            id="classificado"
                                            name="classificado"
                                            value="Classificado"
                                            checked={formData.classificado === "Classificado"}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="classificado">Classificado</label>
                                    </div>
                                    <div className="radio-option">
                                        <input
                                            type="radio"
                                            id="sem-classificacao"
                                            name="classificado"
                                            value="Sem classificação"
                                            checked={formData.classificado === "Sem classificação"}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="sem-classificacao">Sem classificação</label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-col">
                                <div className="form-section-title">Selecione os Avaliadores</div>
                                <div className="form-group">
                                    <label className="form-label">Avaliador 1</label>
                                    <select
                                        className="form-control"
                                        name="avaliador1"
                                        value={formData.avaliador1}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione o Avaliador 1</option>
                                        <option value="Avaliador A">Avaliador A</option>
                                        <option value="Avaliador B">Avaliador B</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Avaliador 2</label>
                                    <select
                                        className="form-control"
                                        name="avaliador2"
                                        value={formData.avaliador2}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione o Avaliador 2</option>
                                        <option value="Avaliador A">Avaliador A</option>
                                        <option value="Avaliador B">Avaliador B</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Avaliador 3</label>
                                    <select
                                        className="form-control"
                                        name="avaliador3"
                                        value={formData.avaliador3}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione o Avaliador 3</option>
                                        <option value="Avaliador A">Avaliador A</option>
                                        <option value="Avaliador B">Avaliador B</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-note">
                            Antes de finalizar a operação, revise todo o documento.
                        </div>

                        <button className="submit-button" type="submit">CADASTRAR</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProjectRegistration;