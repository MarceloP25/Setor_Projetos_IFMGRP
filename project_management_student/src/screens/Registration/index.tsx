import React from 'react';
import { useFormValidation } from '../../hooks/useFormValidation';
import { FormData } from '../../types/registration';
import './styles.css';

const Registration: React.FC = () => {
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

  const { values, errors, loading, handleChange, handleSubmit } = formConfig;

  return (
    <div className="container">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        {/* Campos de formulário */}
        {(Object.keys(values) as Array<keyof FormData>).map(field => (
          field !== 'bolsa' && (
            <div key={field} className={`form-group ${errors[field] ? 'error' : ''}`}>
              <label>{field}</label>
              <input
                type={field === 'senha' ? 'password' : 'text'}
                value={values[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={`${field}`}
              />
              {errors[field] && <span className="error-message">{errors[field]}</span>}
            </div>
          )
        ))}

        {/* Seção Bolsa */}
        <div className="bolsa-section">
          <h3>Dados da Bolsa</h3>
          {(Object.keys(values.bolsa) as Array<keyof FormData['bolsa']>).map(field => (
            <div key={field} className={`form-group ${errors['bolsa']?.[field] ? 'error' : ''}`}>
              <label>{field}</label>
              <input
                type="text"
                value={values.bolsa[field]}
                onChange={(e) => handleChange('bolsa', { ...values.bolsa, [field]: e.target.value })}
                placeholder={`${field}`}
              />
              {errors['bolsa']?.[field] && (
                <span className="error-message">{errors['bolsa'][field]}</span>
              )}
            </div>
          ))}
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
  );
};

export default Registration;