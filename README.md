# ⏱️ Fokus — Temporizador de Produtividade

Projeto desenvolvido durante meus estudos de **JavaScript**, a partir do projeto Fokus disponibilizado pela **Alura**.

O objetivo principal foi praticar JavaScript manipulando uma interface já construída em HTML e CSS, criando um temporizador baseado na técnica Pomodoro e adicionando funcionalidades de interação com tarefas.

> **Observação:** O HTML e o CSS iniciais foram fornecidos pela Alura. O desenvolvimento e a implementação das funcionalidades em JavaScript foram realizados durante meus estudos no curso da Alura.

---

## 📋 Sobre o projeto

O Fokus é um aplicativo de produtividade que permite alternar entre diferentes momentos:

- 🎯 Foco
- ☕ Descanso curto
- 🌿 Descanso longo

Durante o período de foco, o usuário pode selecionar uma tarefa para realizar. Quando o temporizador termina, a tarefa selecionada é marcada automaticamente como concluída.

O projeto também possui controle de música e efeitos sonoros para melhorar a experiência de uso.

---

## 🚀 Funcionalidades

### ⏱️ Temporizador

- Temporizador para período de foco.
- Temporizador para descanso curto.
- Temporizador para descanso longo.
- Iniciar e pausar o temporizador.
- Atualização do botão entre "Começar" e "Pausar".
- Exibição do tempo formatado na tela.
- Aviso sonoro quando o tempo termina.

### 🎵 Áudio

- Ativação e desativação da música de foco.
- Música em loop durante o período de foco.
- Som ao iniciar o temporizador.
- Som ao pausar o temporizador.
- Som ao finalizar o temporizador.

### 📝 Lista de tarefas

- Adicionar novas tarefas.
- Exibir tarefas na interface.
- Selecionar uma tarefa para o período de foco.
- Exibir a tarefa selecionada.
- Editar tarefas.
- Marcar automaticamente uma tarefa como concluída quando o período de foco termina.
- Desabilitar a edição de uma tarefa concluída.
- Remover tarefas concluídas.
- Remover todas as tarefas.

### 💾 Persistência de dados

As tarefas são armazenadas no navegador utilizando `localStorage`.

Dessa forma, as tarefas continuam disponíveis mesmo depois de atualizar a página.

---

## 🧠 Conceitos de JavaScript praticados

Durante o desenvolvimento deste projeto, pratiquei diversos conceitos de JavaScript, incluindo:

### Variáveis e estruturas

- `const` e `let`
- Objetos
- Arrays
- Condicionais
- Arrow functions
- Operador ternário

### Manipulação do DOM

- `querySelector()`
- `querySelectorAll()`
- `createElement()`
- `append()`
- `classList.add()`
- `classList.remove()`
- `setAttribute()`
- `textContent`
- `innerHTML`
- `remove()`

### Eventos

- `addEventListener()`
- Eventos de `click`
- Eventos de `submit`
- Eventos de `change`
- `CustomEvent`
- `dispatchEvent()`

### Arrays

- `forEach()`
- `push()`
- `filter()`

### Temporizador

- `setInterval()`
- `clearInterval()`

### Data e horário

- `Date`
- `toLocaleTimeString()`

### Áudio

- `Audio`
- `play()`
- `pause()`
- `loop`

### Armazenamento

- `localStorage`
- `JSON.stringify()`
- `JSON.parse()`

---

## 🔄 Comunicação entre o temporizador e as tarefas

Uma das partes mais interessantes do projeto foi fazer o temporizador se comunicar com a lista de tarefas.

Quando o período de foco termina, o JavaScript cria um evento personalizado:

```javascript
const evento = new CustomEvent("focoFinalizado");
```

Depois o evento é disparado

```javascript
document.dispatchEvent(evento);
````

O arquivo responsável pelas tarefas fica "escutando" esse evento:
```javascript
document.addEventListener("focoFinalizado", () => {
    // marca a tarefa selecionada como concluída
});
```

Dessa forma, quando o temporizador termina, a tarefa que estava selecionada é automaticamente marcada como concluída.