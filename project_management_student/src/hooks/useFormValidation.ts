import { useState } from 'react';
import { db } from '../service/firebaseUtil';
import { doc, setDoc } from 'firebase/firestore';
import { FormData } from '../types/registration';
import firebase from 'firebase/compat/app';

export const useFormValidation = <T extends FormData>(initialState: T) => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateField = (field: keyof FormData, value: string): string => {
    switch(field) {
      case 'cpf':
        return !value.match(/^\d{11}$/) ? 'CPF inválido' : '';
      case 'email':
        return !value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/) ? 'Email inválido' : '';
      case 'senha':
        return value.length < 6 ? 'Senha deve ter pelo menos 6 caracteres' : '';
      default:
        return !value ? 'Campo obrigatório' : '';
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
    
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const userId = values.cpf;
      await setDoc(doc(db, "alunos", userId), {
        ...values,
        createdAt: new Date()
      });
      alert('Cadastro realizado com sucesso!');
      setValues(initialState);
    } catch (error) {
      if ((error as firebase.FirebaseError).code === 'already-exists') {
        alert('Já existe um usuário com este CPF!');
      } else {
        alert('Erro ao cadastrar: ' + (error as Error).message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { values, errors, loading, handleChange, handleSubmit };
};