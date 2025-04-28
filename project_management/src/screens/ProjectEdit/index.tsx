import React, { useState } from 'react';
import { db } from '../../firebase/firebaseUtil';
import { addDoc, collection } from 'firebase/firestore';
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
    areaTematica: string;
    linhaExtensao: string;
    detalhes: string;
    classificado: string;
    avaliador1: string;
    avaliador2: string;
    avaliador3: string;
}

const ProjectRegistration: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        edital: '', nomeProjeto: '', ano: '', periodoInicio: '', 
        periodoFim: '', abrangencia: '', nomeAcao: '', nomeCoordenador: '',
        emailCoordenador: '', nomeCoCoordenador: '', emailCoCoordenador: '',
        publicoInterno: '', qtdInterno: '', publicoExterno: '', qtdExterno: '',
        estado: '', municipio: '', bairro: '', espaco: '', financiamento: '',
        totalBolsas: '', areaTematica: '', linhaExtensao: '', detalhes: '',
        classificado: '', avaliador1: '', avaliador2: '', avaliador3: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addDoc(collection(db, 'projetos'), formData);
        alert('Projeto cadastrado com sucesso!');
        setFormData({
            edital: '', nomeProjeto: '', ano: '', periodoInicio: '',
            periodoFim: '', abrangencia: '', nomeAcao: '', nomeCoordenador: '',
            emailCoordenador: '', nomeCoCoordenador: '', emailCoCoordenador: '',
            publicoInterno: '', qtdInterno: '', publicoExterno: '', qtdExterno: '',
            estado: '', municipio: '', bairro: '', espaco: '', financiamento: '',
            totalBolsas: '', areaTematica: '', linhaExtensao: '', detalhes: '',
            classificado: '', avaliador1: '', avaliador2: '', avaliador3: ''
        });
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
                            
                            <div className="form-col">
                                <label className="form-label">Período de Realização</label>
                                <div className="period-container">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="periodoInicio"
                                        value={formData.periodoInicio}
                                        onChange={handleChange}
                                        placeholder="Início"
                                    />
                                    <span className="period-separator">a</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="periodoFim"
                                        value={formData.periodoFim}
                                        onChange={handleChange}
                                        placeholder="Fim"
                                    />
                                </div>
                            </div>
                            
                            <div className="form-col">
                                <label className="form-label">Abrangência</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="abrangencia"
                                    value={formData.abrangencia}
                                    onChange={handleChange}
                                    placeholder="Abrangência"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Nome da Ação</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nomeAcao"
                                value={formData.nomeAcao}
                                onChange={handleChange}
                                placeholder="Nome da Ação"
                            />
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
                                <label className="form-label">Discriminar Público Alvo Interno</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="publicoInterno"
                                    value={formData.publicoInterno}
                                    onChange={handleChange}
                                    placeholder="Discriminar Público Alvo Interno"
                                />
                            </div>
                            
                            <div className="form-col">
                                <label className="form-label">Quantificar Público Alvo Interno</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="qtdInterno"
                                    value={formData.qtdInterno}
                                    onChange={handleChange}
                                    placeholder="Quantidade"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-col">
                                <label className="form-label">Discriminar Público Alvo Externo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="publicoExterno"
                                    value={formData.publicoExterno}
                                    onChange={handleChange}
                                    placeholder="Discriminar Público Alvo Externo"
                                />
                            </div>
                            
                            <div className="form-col">
                                <label className="form-label">Quantificar Público Alvo Externo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="qtdExterno"
                                    value={formData.qtdExterno}
                                    onChange={handleChange}
                                    placeholder="Quantidade"
                                />
                            </div>
                        </div>

                        <div className="section-title">Local de Realização</div>
                        <div className="form-row">
                            <div className="form-col">
                                <label className="form-label">Estado</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="estado"
                                    value={formData.estado}
                                    onChange={handleChange}
                                    placeholder="Estado"
                                />
                            </div>
                            
                            <div className="form-col">
                                <label className="form-label">Município</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="municipio"
                                    value={formData.municipio}
                                    onChange={handleChange}
                                    placeholder="Município"
                                />
                            </div>
                            
                            <div className="form-col">
                                <label className="form-label">Bairro</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="bairro"
                                    value={formData.bairro}
                                    onChange={handleChange}
                                    placeholder="Bairro"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Espaço de Realização</label>
                            <input
                                type="text"
                                className="form-control"
                                name="espaco"
                                value={formData.espaco}
                                onChange={handleChange}
                                placeholder="Espaço de Realização"
                            />
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
                                <label className="form-label">Número Total de Bolsas do Projeto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="totalBolsas"
                                    value={formData.totalBolsas}
                                    onChange={handleChange}
                                    placeholder="Total de Bolsas"
                                />
                            </div>
                        </div>

                        <div className="form-section">
                            <div className="form-section-title">Área Temática</div>
                            <div className="radio-group">
                                <div className="radio-option">
                                    <input 
                                        type="radio" 
                                        id="comunicacao" 
                                        name="areaTematica" 
                                        value="Comunicação"
                                        checked={formData.areaTematica === "Comunicação"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="comunicacao">Comunicação</label>
                                </div>
                                <div className="radio-option">
                                    <input 
                                        type="radio" 
                                        id="cultura" 
                                        name="areaTematica" 
                                        value="Cultura"
                                        checked={formData.areaTematica === "Cultura"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="cultura">Cultura</label>
                                </div>
                                <div className="radio-option">
                                    <input 
                                        type="radio" 
                                        id="direitos" 
                                        name="areaTematica" 
                                        value="Direitos Humanos e Justiça"
                                        checked={formData.areaTematica === "Direitos Humanos e Justiça"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="direitos">Direitos Humanos e Justiça</label>
                                </div>
                                <div className="radio-option">
                                    <input 
                                        type="radio" 
                                        id="educacao" 
                                        name="areaTematica" 
                                        value="Educação"
                                        checked={formData.areaTematica === "Educação"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="educacao">Educação</label>
                                </div>
                                <div className="radio-option">
                                    <input 
                                        type="radio" 
                                        id="meioambiente" 
                                        name="areaTematica" 
                                        value="Meio Ambiente"
                                        checked={formData.areaTematica === "Meio Ambiente"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="meioambiente">Meio Ambiente</label>
                                </div>
                                <div className="radio-option">
                                    <input 
                                        type="radio" 
                                        id="saude" 
                                        name="areaTematica" 
                                        value="Saúde"
                                        checked={formData.areaTematica === "Saúde"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="saude">Saúde</label>
                                </div>
                                <div className="radio-option">
                                    <input 
                                        type="radio" 
                                        id="tecnologia" 
                                        name="areaTematica" 
                                        value="Tecnologia e Produção"
                                        checked={formData.areaTematica === "Tecnologia e Produção"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="tecnologia">Tecnologia e Produção</label>
                                </div>
                                <div className="radio-option">
                                    <input 
                                        type="radio" 
                                        id="trabalho" 
                                        name="areaTematica" 
                                        value="Trabalho"
                                        checked={formData.areaTematica === "Trabalho"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="trabalho">Trabalho</label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Linha de Extensão</label>
                            <input
                                type="text"
                                className="form-control"
                                name="linhaExtensao"
                                value={formData.linhaExtensao}
                                onChange={handleChange}
                                placeholder="Linha de Extensão"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Detalhes da Ação</label>
                            <textarea
                                className="form-control"
                                name="detalhes"
                                value={formData.detalhes}
                                onChange={handleChange}
                                placeholder="Detalhes da Ação"
                            ></textarea>
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