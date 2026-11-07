# Newton

O Newton é um colega de estudo para Físico-Química, com inteligência artificial. Pensado para alunos do 3.º ciclo (7.º ao 9.º ano) e, numa fase seguinte, do ensino secundário.

**Experimentar:** https://chat-newton.netlify.app/

É um protótipo de um projeto escolar da formação Design do Futuro · UX Design para Inteligência Artificial. Os conteúdos ainda não foram revistos por um professor.

## O que faz

- Explica a matéria de Físico-Química do 7.º, 8.º e 9.º ano, em 31 temas alinhados com as Aprendizagens Essenciais de março de 2026.
- Responde com IA, apoiado nesses temas, e ajusta a explicação ao ano do aluno. Diz que é uma IA e que se pode enganar.
- Em situações sensíveis (por exemplo, sinais de tristeza ou bullying) usa sempre respostas preparadas e encaminha para a Linha SOS Criança (116 111).
- Se a IA não estiver disponível, mostra as explicações preparadas.
- Guarda as conversas só no navegador do aluno, sem contas. O aluno pode apagá-las ou não guardar uma conversa.
- Funciona no computador e no telemóvel, com tema claro e escuro automáticos.

## Como funciona

A página é publicada no Netlify. Uma Netlify Function (`netlify/functions/chat`) recebe a pergunta, junta a instrução de sistema e a chave da IA, e fala com o modelo. A chave fica nas variáveis de ambiente do Netlify e nunca aparece no código.

## Design

Interface construída com o [Material Design 3](https://m3.material.io) da Google, usando os componentes [Material Web](https://github.com/material-components/material-web). As cores inspiram-se no laboratório de química: o azul do sulfato de cobre e o âmbar da chama do sódio.

## Correr localmente

```bash
npm install
npm run dev
```

Sem a função do Netlify, o Newton usa só as respostas preparadas.
