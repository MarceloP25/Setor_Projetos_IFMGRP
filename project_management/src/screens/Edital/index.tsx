import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebaseUtil';
import { doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import './styles.css';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

interface Edital {
    id: string;
    nome: string;
}

const EditalRegistration: React.FC = () => {
    const [novoEdital, setNovoEdital] = useState<string>('');
    const [editais, setEditais] = useState<Edital[]>([]);

    // Função para sanitizar o nome do edital
    const sanitizeName = (name: string): string => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .replace(/\s+/g, '-');
    };

    useEffect(() => {
        carregarEditais();
    }, []);

    const carregarEditais = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "editais"));
            const editaisLista = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Edital[];
            setEditais(editaisLista);
        } catch (erro) {
            alert('Erro ao carregar editais: ');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!novoEdital.trim()) {
            alert('Por favor, insira um nome válido para o edital');
            return;
        }

        const editalId = sanitizeName(novoEdital);
        
        try {
            await setDoc(doc(db, "editais", editalId), {
                nome: novoEdital,
                createdAt: new Date()
            });
            
            setNovoEdital('');
            carregarEditais();
            alert('Edital cadastrado com sucesso!');
        } catch (erro) {
                console.log('Erro ao cadastrar edital');
            
        }
    };

    const excluirEdital = async (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir este edital?')) {
            try {
                await deleteDoc(doc(db, "editais", id));
                carregarEditais();
                alert('Edital excluído com sucesso!');
            } catch (erro) {
                alert('Erro ao excluir edital: ');
            }
        }
    };

    return (
        <div className="container">
            {/* <Sidebar /> */}
            <div className="main-content">
                <Header />
                <div className="form-container">
                    <div className="form-title">Cadastro de Editais</div>
                    {/* Formulário de cadastro */}
                    <form onSubmit={handleSubmit} className="edital-form">
                        <div className="form-group">
                            <label className="form-label">Nome do Edital</label>
                            <input
                                type="text"
                                className="form-control"
                                value={novoEdital}
                                onChange={(e) => setNovoEdital(e.target.value)}
                                placeholder="Nome do Edital"
                            />
                        </div>
                        <button className="submit-button" type="submit">
                            CADASTRAR EDITAL
                        </button>
                    </form>
                    {/* Lista de editais */}
                    <div className="editais-list">
                        <h2>Editais Cadastrados</h2>
                        <div className="editais-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nome do Edital</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {editais.map(edital => (
                                        <tr key={edital.id}>
                                            <td>{edital.nome}</td>
                                            <td>
                                                <button
                                                    className="delete-button"
                                                    onClick={() => excluirEdital(edital.id)}
                                                >
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditalRegistration;