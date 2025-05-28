import { db, storage } from "./config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const salvarEdital = async (nome, conteudo, file) => {
    const storageRef = ref(storage, `editais/${file.name}`);
    await uploadBytes(storageRef, file);
    const fileUrl = await getDownloadURL(storageRef);

    const edital = {
        nome,
        conteudo,
        arquivoUrl: fileUrl,
        data: new Date()
    };

    await addDoc(collection(db, "editais"), edital);
};

export const salvarAluno = async (nome, cpf, email, modalidadeEnsino, curso, file) => {
  try {
    // Validação dos campos obrigatórios
    if (!nome || !cpf || !email || !modalidadeEnsino || !curso || !file) {
      throw new Error('Todos os campos são obrigatórios');
    }

    // Upload do arquivo
    const storageRef = ref(storage, `alunos/${file.name}`);
    const uploadTask = uploadBytes(storageRef, file);
    
    // Monitora o progresso do upload
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload em andamento: ' + progress + '%');
      },
      (error) => {
        throw new Error(`Erro ao fazer upload do arquivo: ${error.message}`);
      },
      async () => {
        // Obtém a URL do arquivo após o upload
        const fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
        
        // Cria o documento do aluno
        const aluno = {
          nome,
          cpf,
          email,
          modalidadeEnsino,
          curso,
          arquivoUrl: fileUrl,
          dataCadastro: new Date()
        };

        // Salva no Firestore
        await addDoc(collection(db, "alunos"), aluno);
        console.log('Aluno salvo com sucesso!');
      }
    );
  } catch (error) {
    console.error('Erro ao salvar aluno:', error.message);
    throw error;
  }
};
export { db };

