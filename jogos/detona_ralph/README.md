# Detona Ralph

Jogo estilo "Whack-a-Mole" desenvolvido com HTML, CSS, JavaScript e backend em Flask.

---

## Descrição

Detona Ralph é um jogo web onde o jogador deve clicar rapidamente nos inimigos que aparecem nas casas antes que o tempo acabe ou as vidas terminem. O frontend é desenvolvido com HTML5, CSS3 e JavaScript, enquanto Flask serve as páginas e gerencia o backend.

---

## Estrutura do Projeto

```
/

├── index.html          # Página inicial do jogo 
├── src/                # Arquivos estáticos: CSS, imagens, áudio, scripts
│   ├── audios/
│   ├── images/
│   ├── scripts/
│   │   └── engine.js
│   └── styles/
│       ├── main.css
│       └── reset.css
├── templates/          # Pasta para templates HTML Flask
└── README.md           # Este arquivo
```

---

## Pré-requisitos

- Python 3.8+
- Flask (`pip install Flask`)

---

## Como rodar

1. Clone o repositório:

```bash
git clone https://github.com/seuusuario/detona-ralph.git
cd detona-ralph
```

2. Instale o Flask (caso ainda não tenha):

```bash
pip install Flask
```

3. Execute o servidor:

```bash
python app.py
```

4. Abra o navegador e acesse:

```
http://localhost:5000/
```

---

## Funcionalidades atuais

- Jogo com cronômetro regressivo e sistema de vidas
- Pontuação em tempo real
- Controle de som (liga/desliga)
- Áudios para hits, game over e música de fundo
- Frontend responsivo e estilizado com fontes personalizadas

---

## Próximos passos

- Salvar placar no backend (por exemplo, SQLite)
- Implementar autenticação de usuários
- Gerar APK Android usando WebView para transformar o jogo em app mobile

---

## Contato

Para dúvidas ou contribuições, entre em contato: [jeffersson.jaily@gmail.com]

---

**Divirta-se jogando Detona Ralph!**

