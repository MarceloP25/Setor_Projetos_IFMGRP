import React, { useEffect, useState } from 'react';
import { useFormValidation } from '../../hooks/useFormValidation';
import { FormData } from '../../types/registration';
import './styles.css';
import Header from '../../components/Header';
import { Edital } from '../../types/Edital';
import { getDocs } from 'firebase/firestore';

const Registration: React.FC = () => {
  const fieldLabels: Record<keyof FormData, string> = {
  nome: 'Nome',
  cpf: 'CPF',
  telefone: 'Telefone',
  sexo: 'Sexo',
  modalidadeEnsino: 'Modalidade de ensino',
  curso: 'Curso',
  projetoVinculado: 'Projeto vinculado',
  tipoVinculo: 'Tipo de vínculo',
  bolsa: 'Dados da Bolsa',
  email: 'Email',
  senha: 'Senha'
};

  const formConfig = useFormValidation<FormData>({
    nome: '',
    cpf: '',
    telefone: '',
    sexo: 'masculino',
    modalidadeEnsino: '',
    curso: '',
    projetoVinculado: '',
    tipoVinculo: '',
    bolsa: {
      valor: 0,
      bancoPagamento: '',
      numeroAgencia: '',
      numeroContaCorrente: ''
    },
    email: '',
    senha: ''
  });

  const CURSO_OPTIONS = {
  graduacao: [
    'Agronomia',
    'Administração',
    'Agroecologia',
    'Ciência da Computação',
    'Ciência e Tecnologia de Alimentos',
    'Ciência e Tecnologia de Laticínios',
    'Direito',
    'Educação Física - Bacharelado',
    'Licenciatura Educação Física',
    'Licenciatura em Matemática',
    'Tecnologia em Laticínios EAD',
    'Zootecnia'
  ],
  tecnico_integrado: [
    'Agropecuária',
    'Alimentos',
    'Informática',
    'Meio Ambiente',
    'Comércio - EJA/EPT',
    'Química',
    'Zootecnia'
  ],
  tecnico_concomitante_subsequente: [
    'Administração',
    'Segurança do Trabalho',
    'Serviços Jurídicos'
  ],
  tecnico_subsequente_ead: [
    'Alimentos',
    'Meio Ambiente',
    'Secretaria Escolar',
    'Zootecnia',
    'Segurança do trabalho'
  ],
  pos_graduacao_lato_sensu: [
    'Agroecologia',
    'Desenvolvimento Web e Mobile',
    'Docência na Educação Profissional e Tecnológica',
    'Ensino de Matemática e Física',
    'MBA em Gestão Empreendedora'
  ],
  pos_graduacao_stricto_sensu: [
    'Mestrado Profissional em Ciência e Tecnologia de Alimentos',
    'Mestrado Profissional em Educação Profissional e Tecnológica',
    'Mestrado Profissional em Nutrição e Produção Animal',
    'Mestrado Profissional em Educação Física',
    'Doutorado Profissional em Ciência e Tecnologia de Alimentos'
  ]
};

  const { values, errors, loading, handleChange, handleSubmit } = formConfig;
    const [editais, setEditais] = useState<Edital[]>([]);
  const [loadingEditais, setLoadingEditais] = useState(false);



    const getLabel = (field: keyof FormData): string => {
    if (field === 'bolsa') return fieldLabels[field];
    return fieldLabels[field] || String(field);
  };

  const getNestedLabel = (field: keyof FormData['bolsa']): string => {
    switch (field) {
      case 'valor':
        return 'Valor da Bolsa';
      case 'bancoPagamento':
        return 'Banco Pagamento';
      case 'numeroAgencia':
        return 'Número da Agência';
      case 'numeroContaCorrente':
        return 'Número da Conta Corrente';
      default:
        return String(field);
    }
  };

   useEffect(() => {
    carregarEditais();
  }, []);

  const carregarEditais = async () => {
    try {
      setLoadingEditais(true);
      const querySnapshot = await getDocs(collection(db, "editais"));
      const editaisLista = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Edital[];
      setEditais(editaisLista);
    } catch (erro) {
      alert('Erro ao carregar editais: ' + erro.message);
    } finally {
      setLoadingEditais(false);
    }
  };

  
  return (
    <div className="container">
      <div className="main-content">
        <Header />
        <div className="form-container">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        {/* Campos de formulário */}
    {(Object.keys(values) as Array<keyof FormData>).map(field => (
              field !== 'bolsa' && (
                <div key={field} className={`form-group ${errors[field] ? 'error' : ''}`}>
                  <label className="form-label">{getLabel(field)}</label>
                  {field === 'sexo' ? (
                    <select
                      value={values.sexo}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className={`form-control ${errors[field] ? 'error' : ''}`}
                    >
                      <option value="masculino">Masculino</option>
                      <option value="feminino">Feminino</option>
                    </select>
                  ) : field === 'modalidadeEnsino' ? (
                    <select
                      value={values.modalidadeEnsino}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className={`form-control ${errors[field] ? 'error' : ''}`}
                    >
                      <option value="">Selecione uma modalidade</option>
                      <option value="tecnico_integrado">Técnico Integrado</option>
                      <option value="tecnico_concomitante_subsequente">Técnico Concomitante/Subsequente</option>
                      <option value="tecnico_subsequente_ead">Técnico Subsequente EAD</option>
                      <option value="graduacao">Graduação</option>
                      <option value="pos_graduacao_lato_sensu">Pós Graduação Lato Sensu</option>
                      <option value="pos_graduacao_stricto_sensu">Pós Graduação Stricto Sensu</option>
                      <option value="nao_aluno_ifsudestemg">Não sou aluno do IFSudesteMG</option>
                    </select>
                  ) : field === 'curso' ? (
                    <select
                      value={values.curso}
                      onChange={(e) => handleChange(field, e.target.value)}
                      className={`form-control ${errors[field] ? 'error' : ''}`}
                      disabled={!values.modalidadeEnsino || !CURSO_OPTIONS[values.modalidadeEnsino]}
                    >
                      <option value="">Selecione um curso</option>
                      {values.modalidadeEnsino && CURSO_OPTIONS[values.modalidadeEnsino] && CURSO_OPTIONS[values.modalidadeEnsino].map(curso => (
                        <option key={curso} value={curso}>{curso}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field === 'senha' ? 'password' : 'text'}
                      className="form-control"
                      value={values[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
                      placeholder={getLabel(field)}
                    />
                  )}
                  {errors[field] && <span className="error-message">{errors[field]}</span>}
                </div>
              )
            ))}

        {/* Seção Bolsa */}
        <div className="bolsa-section">
          <h3 className="form-title">Dados da Bolsa</h3>
          {(Object.keys(values.bolsa) as Array<keyof FormData['bolsa']>).map(field => (
            <div key={field} className={`form-group ${errors['bolsa']?.[field] ? 'error' : ''}`}>
              <label className="form-label">{getNestedLabel(field)}</label>
              <input
                type="text"
                value={values.bolsa[field]}
                className="form-control"
                onChange={(e) => handleChange('bolsa', { ...values.bolsa, [field]: e.target.value })}
                placeholder={getNestedLabel(field)}
              />
              {errors['bolsa']?.[field] && (
                <span className="error-message">{errors['bolsa'][field]}</span>
              )}
            </div>
          ))}
        </div>

          <div>
            <h3>
              Antes de finalizar a operação, revise todos os dados.
            </h3>
          </div>
        <button
          type="submit"
          disabled={loading}
          className={`submit-button ${loading ? 'loading' : ''}`}
        >
          {loading ? 'Cadastrando...' : 'CADASTRAR'}
        </button>
      </form>
      </div>
      </div>
    </div>
  );
};

export default Registration;