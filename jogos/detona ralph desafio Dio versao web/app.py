from flask import Flask, render_template, request, jsonify
import json
import os
app = Flask(__name__)

app = Flask(__name__, static_folder='src', static_url_path='/src')

PONTUACOES_FILE = 'pontuacoes.json'

def carregar_pontuacoes():
    if not os.path.exists(PONTUACOES_FILE):
        return []
    with open(PONTUACOES_FILE, 'r') as f:
        return json.load(f)

def salvar_pontuacoes(pontuacoes):
    with open(PONTUACOES_FILE, 'w') as f:
        json.dump(pontuacoes, f, indent=4)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/pontuacao', methods=['GET'])
def obter_pontuacoes():
    pontuacoes = carregar_pontuacoes()
    pontuacoes_ordenadas = sorted(
        pontuacoes,
        key=lambda x: x.get('pontuacao', 0),
        reverse=True
    )
    return jsonify(pontuacoes_ordenadas)

@app.route('/pontuacao', methods=['POST'])
def salvar_pontuacao():
    dados = request.get_json()

    if not dados or 'nome' not in dados or 'pontuacao' not in dados:
        return jsonify({'erro': 'Dados inválidos'}), 400

    try:
        pont = int(dados['pontuacao'])
    except ValueError:
        return jsonify({'erro': 'Pontuação deve ser um número inteiro'}), 400

    nova_pontuacao = {
        'nome': dados['nome'],
        'pontuacao': pont
    }

    pontuacoes = carregar_pontuacoes()
    pontuacoes.append(nova_pontuacao)
    salvar_pontuacoes(pontuacoes)

    return jsonify({'mensagem': 'Pontuação salva com sucesso!'}), 201

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, render_template, jsonify, request



# Exemplo simples para obter pontuações (de onde você guarda)
pontuacoes = [
    {'nome': 'Alice', 'pontuacao': 15},
    {'nome': 'Bob', 'pontuacao': 12},
    # etc...
]

@app.route('/ranking')
def ranking():
    # Ordena por pontuação decrescente e limita a top 10
    top_pontuacoes = sorted(pontuacoes, key=lambda x: x['pontuacao'], reverse=True)[:10]
    return render_template('rank.html', pontuacoes=top_pontuacoes)

# Rota para salvar pontuação via POST
@app.route('/pontuacao', methods=['POST'])
def salvar_pontuacao():
    data = request.get_json()
    nome = data.get('nome', 'Anônimo')
    pontuacao = data.get('pontuacao', 0)
    pontuacoes.append({'nome': nome, 'pontuacao': pontuacao})
    return jsonify({'status': 'ok', 'mensagem': 'Pontuação salva!'})
