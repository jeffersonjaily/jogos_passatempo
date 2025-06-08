  // Pokémon Battle Game Script

  const pokemons = {
    charmander: {
      name: "Charmander",
      type: "Fogo",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
      hp: 100,
      hpMax: 100,
      mp: 50,
      mpMax: 50,
      xp: 0,
      evoluiPara: "charmeleon",
      ataques: [
        { nome: "Arranhão", dano: 10, mana: 0 },
        { nome: "Brasas", dano: 20, mana: 10 }
      ]
    },
    charmeleon: {
      name: "Charmeleon",
      type: "Fogo",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
      hp: 120,
      hpMax: 120,
      mp: 70,
      mpMax: 70,
      xp: 0,
      evoluiPara: "charizard",
      ataques: [
        { nome: "Garra", dano: 15, mana: 0 },
        { nome: "Lança-chamas", dano: 30, mana: 20 }
      ]
    },
    charizard: {
      name: "Charizard",
      type: "Fogo",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
      hp: 150,
      hpMax: 150,
      mp: 90,
      mpMax: 90,
      xp: 0,
      evoluiPara: null,
      ataques: [
        { nome: "Voo", dano: 25, mana: 0 },
        { nome: "Explosão de Fogo", dano: 50, mana: 30 },
        { nome: "Garra de Dragão", dano: 35, mana: 15 }
      ]
    },
    squirtle: {
      name: "Squirtle",
      type: "Água",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
      hp: 110,
      hpMax: 110,
      mp: 50,
      mpMax: 50,
      xp: 0,
      evoluiPara: "wartortle",
      ataques: [
        { nome: "Investida", dano: 10, mana: 0 },
        { nome: "Jato D'água", dano: 20, mana: 10 }
      ]
    },
    wartortle: {
      name: "Wartortle",
      type: "Água",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
      hp: 130,
      hpMax: 130,
      mp: 70,
      mpMax: 70,
      xp: 0,
      evoluiPara: "blastoise",
      ataques: [
        { nome: "Aqua Jato", dano: 15, mana: 0 },
        { nome: "Pulso D'água", dano: 30, mana: 20 }
      ]
    },
    blastoise: {
      name: "Blastoise",
      type: "Água",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
      hp: 160,
      hpMax: 160,
      mp: 100,
      mpMax: 100,
      xp: 0,
      evoluiPara: null,
      ataques: [
        { nome: "Casca de Gelo", dano: 25, mana: 0 },
        { nome: "Hidro Bomba", dano: 50, mana: 30 },
        { nome: "Surfar", dano: 35, mana: 15 }
      ]
    },
    bulbasaur: {
      name: "Bulbasaur",
      type: "Planta",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      hp: 120,
      hpMax: 120,
      mp: 60,
      mpMax: 60,
      xp: 0,
      evoluiPara: "ivysaur",
      ataques: [
        { nome: "Investida", dano: 10, mana: 0 },
        { nome: "Folha Navalha", dano: 20, mana: 10 }
      ]
    },
    ivysaur: {
      name: "Ivysaur",
      type: "Planta",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
      hp: 140,
      hpMax: 140,
      mp: 80,
      mpMax: 80,
      xp: 0,
      evoluiPara: "venusaur",
      ataques: [
        { nome: "Chicote de Vinha", dano: 15, mana: 0 },
        { nome: "Pó do Sono", dano: 0, mana: 10 }
      ]
    },
    venusaur: {
      name: "Venusaur",
      type: "Planta",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      hp: 170,
      hpMax: 170,
      mp: 110,
      mpMax: 110,
      xp: 0,
      evoluiPara: null,
      ataques: [
        { nome: "Bomba de Sementes", dano: 25, mana: 0 },
        { nome: "Rajada de Pétalas", dano: 50, mana: 30 },
        { nome: "Terremoto", dano: 40, mana: 20 }
      ]
    },
    pikachu: {
      name: "Pikachu",
      type: "Elétrico",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      hp: 90,
      hpMax: 90,
      mp: 60,
      mpMax: 60,
      xp: 0,
      evoluiPara: "raichu",
      ataques: [
        { nome: "Choque do Trovão", dano: 15, mana: 0 },
        { nome: "Cauda de Ferro", dano: 25, mana: 10 }
      ]
    },
    raichu: {
      name: "Raichu",
      type: "Elétrico",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png",
      hp: 110,
      hpMax: 110,
      mp: 80,
      mpMax: 80,
      xp: 0,
      evoluiPara: null,
      ataques: [
        { nome: "Investida Trovão", dano: 20, mana: 0 },
        { nome: "Trovão", dano: 40, mana: 20 },
        { nome: "Esfera Elétrica", dano: 30, mana: 15 }
      ]
    },
    geodude: {
      name: "Geodude",
      type: "Pedra",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png",
      hp: 130,
      hpMax: 130,
      mp: 40,
      mpMax: 40,
      xp: 0,
      evoluiPara: "graveler",
      ataques: [
        { nome: "Lançamento de Pedra", dano: 18, mana: 0 },
        { nome: "Terremoto", dano: 30, mana: 15 }
      ]
    },
    graveler: { // Novo Pokémon
      name: "Graveler",
      type: "Pedra",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/75.png",
      hp: 150,
      hpMax: 150,
      mp: 50,
      mpMax: 50,
      xp: 0,
      evoluiPara: "golem",
      ataques: [
        { nome: "Pedra Afiada", dano: 25, mana: 0 },
        { nome: "Rolagem", dano: 35, mana: 15 }
      ]
    },
    golem: { // Novo Pokémon
      name: "Golem",
      type: "Pedra",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/76.png",
      hp: 180,
      hpMax: 180,
      mp: 60,
      mpMax: 60,
      xp: 0,
      evoluiPara: null,
      ataques: [
        { nome: "Terremoto", dano: 45, mana: 0 },
        { nome: "Explosão", dano: 60, mana: 30 }
      ]
    },
    gastly: {
      name: "Gastly",
      type: "Fantasma",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png",
      hp: 80,
      hpMax: 80,
      mp: 70,
      mpMax: 70,
      xp: 0,
      evoluiPara: "haunter",
      ataques: [
        { nome: "Lick", dano: 10, mana: 0 },
        { nome: "Bola Sombria", dano: 25, mana: 15 }
      ]
    },
    haunter: { // Novo Pokémon
      name: "Haunter",
      type: "Fantasma",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png",
      hp: 100,
      hpMax: 100,
      mp: 90,
      mpMax: 90,
      xp: 0,
      evoluiPara: "gengar",
      ataques: [
        { nome: "Hipnose", dano: 0, mana: 10 },
        { nome: "Gás Venenoso", dano: 20, mana: 0 },
        { nome: "Beijo Drenante", dano: 35, mana: 20 }
      ]
    },
    gengar: { // Novo Pokémon
      name: "Gengar",
      type: "Fantasma",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png",
      hp: 120,
      hpMax: 120,
      mp: 120,
      mpMax: 120,
      xp: 0,
      evoluiPara: null,
      ataques: [
        { nome: "Ataque da Sombra", dano: 30, mana: 0 },
        { nome: "Bola Sombria", dano: 50, mana: 25 },
        { nome: "Pesadelo", dano: 0, mana: 30 } // Ataque de status
      ]
    },
    eevee: { // Novo Pokémon
      name: "Eevee",
      type: "Normal",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png",
      hp: 95,
      hpMax: 95,
      mp: 40,
      mpMax: 40,
      xp: 0,
      evoluiPara: null, // Eevee tem múltiplas evoluções, complicado para um único campo
      ataques: [
        { nome: "Investida", dano: 10, mana: 0 },
        { nome: "Olhar Atencioso", dano: 0, mana: 0 }
      ]
    },
    snorlax: { // Novo Pokémon
      name: "Snorlax",
      type: "Normal",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png",
      hp: 200,
      hpMax: 200,
      mp: 30,
      mpMax: 30,
      xp: 0,
      evoluiPara: null,
      ataques: [
        { nome: "Body Slam", dano: 35, mana: 0 },
        { nome: "Descanso", dano: 0, mana: 15 } // Cura HP
      ]
    },
    rattata: { // Novo Pokémon
      name: "Rattata",
      type: "Normal",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png",
      hp: 70,
      hpMax: 70,
      mp: 30,
      mpMax: 30,
      xp: 0,
      evoluiPara: "raticate",
      ataques: [
        { nome: "Investida", dano: 8, mana: 0 },
        { nome: "Quick Attack", dano: 15, mana: 0 }
      ]
    },
    raticate: { // Novo Pokémon
      name: "Raticate",
      type: "Normal",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png",
      hp: 90,
      hpMax: 90,
      mp: 40,
      mpMax: 40,
      xp: 0,
      evoluiPara: null,
      ataques: [
        { nome: "Hyper Fang", dano: 25, mana: 0 },
        { nome: "Super Fang", dano: 0, mana: 10 } // Tira metade do HP atual do oponente
      ]
    },
    abra: { // Novo Pokémon
      name: "Abra",
      type: "Psíquico",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/63.png",
      hp: 60,
      hpMax: 60,
      mp: 80,
      mpMax: 80,
      xp: 0,
      evoluiPara: "kadabra",
      ataques: [
        { nome: "Teleporte", dano: 0, mana: 5 }, // Pode fugir ou trocar
        { nome: "Confusão", dano: 15, mana: 10 }
      ]
    },
    kadabra: { // Novo Pokémon
      name: "Kadabra",
      type: "Psíquico",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/64.png",
      hp: 80,
      hpMax: 80,
      mp: 100,
      mpMax: 100,
      xp: 0,
      evoluiPara: "alakazam",
      ataques: [
        { nome: "Psíquico", dano: 30, mana: 20 },
        { nome: "Recuperação", dano: 0, mana: 15 } // Cura HP
      ]
    },
    alakazam: { // Novo Pokémon
      name: "Alakazam",
      type: "Psíquico",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png",
      hp: 100,
      hpMax: 100,
      mp: 150,
      mpMax: 150,
      xp: 0,
      evoluiPara: null,
      ataques: [
        { nome: "Psíquico", dano: 50, mana: 30 },
        { nome: "Futuro Sombrio", dano: 0, mana: 25 } // Ataque com atraso
      ]
    },
    caterpie: { // Novo Pokémon
      name: "Caterpie",
      type: "Inseto",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
      hp: 80,
      hpMax: 80,
      mp: 30,
      mpMax: 30,
      xp: 0,
      evoluiPara: "metapod",
      ataques: [
        { nome: "Fio de Seda", dano: 0, mana: 5 }, // Reduz velocidade
        { nome: "Investida", dano: 10, mana: 0 }
      ]
    },
    metapod: { // Novo Pokémon
      name: "Metapod",
      type: "Inseto",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
      hp: 90,
      hpMax: 90,
      mp: 20,
      mpMax: 20,
      xp: 0,
      evoluiPara: "butterfree",
      ataques: [
        { nome: "Endurecer", dano: 0, mana: 5 } // Aumenta defesa
      ]
    },
    butterfree: { // Novo Pokémon
      name: "Butterfree",
      type: "Inseto",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
      hp: 110,
      hpMax: 110,
      mp: 70,
      mpMax: 70,
      xp: 0,
      evoluiPara: null,
      ataques: [
        { nome: "Vento de Prata", dano: 20, mana: 0 },
        { nome: "Pó do Sono", dano: 0, mana: 10 },
        { nome: "Furacão", dano: 35, mana: 20 }
      ]
    },
    pidgey: { // Novo Pokémon
      name: "Pidgey",
      type: "Normal",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png",
      hp: 75,
      hpMax: 75,
      mp: 35,
      mpMax: 35,
      xp: 0,
      evoluiPara: "pidgeotto",
      ataques: [
        { nome: "Jato de Areia", dano: 0, mana: 5 },
        { nome: "Ataque Rápido", dano: 15, mana: 0 }
      ]
    },
    pidgeotto: { // Novo Pokémon
      name: "Pidgeotto",
      type: "Normal",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png",
      hp: 95,
      hpMax: 95,
      mp: 50,
      mpMax: 50,
      xp: 0,
      evoluiPara: "pidgeot",
      ataques: [
        { nome: "Bico Broca", dano: 20, mana: 0 },
        { nome: "Vendaval", dano: 30, mana: 15 }
      ]
    },
    pidgeot: { // Novo Pokémon
      name: "Pidgeot",
      type: "Normal",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png",
      hp: 120,
      hpMax: 120,
      mp: 70,
      mpMax: 70,
      xp: 0,
      evoluiPara: null,
      ataques: [
        { nome: "Asa de Aço", dano: 25, mana: 0 },
        { nome: "Fúria dos Pássaros", dano: 45, mana: 25 }
      ]
    },
    onix: { // Novo Pokémon
      name: "Onix",
      type: "Pedra",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png",
      hp: 170,
      hpMax: 170,
      mp: 40,
      mpMax: 40,
      xp: 0,
      evoluiPara: null, // Onix evolui com troca e item
      ataques: [
        { nome: "Lançamento de Pedra", dano: 20, mana: 0 },
        { nome: "Tombamento", dano: 35, mana: 15 }
      ]
    },
    lapras: { // Novo Pokémon
      name: "Lapras",
      type: "Água",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png",
      hp: 180,
      hpMax: 180,
      mp: 80,
      mpMax: 80,
      xp: 0,
      evoluiPara: null,
      ataques: [
        { nome: "Jato D'água", dano: 25, mana: 0 },
        { nome: "Nevasca", dano: 45, mana: 25 },
        { nome: "Canto", dano: 0, mana: 10 } // Causa sono
      ]
    },
    jigglypuff: { // Novo Pokémon
      name: "Jigglypuff",
      type: "Normal",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png",
      hp: 150,
      hpMax: 150,
      mp: 50,
      mpMax: 50,
      xp: 0,
      evoluiPara: "wigglytuff",
      ataques: [
        { nome: "Canção", dano: 0, mana: 10 }, // Causa sono
        { nome: "Tapa Duplo", dano: 18, mana: 0 }
      ]
    },
    wigglytuff: { // Novo Pokémon
      name: "Wigglytuff",
      type: "Normal",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/40.png",
      hp: 200,
      hpMax: 200,
      mp: 70,
      mpMax: 70,
      xp: 0,
      evoluiPara: null,
      ataques: [
        { nome: "Corpo Pesado", dano: 30, mana: 0 },
        { nome: "Hiper Voz", dano: 50, mana: 30 }
      ]
    },
    clefairy: { // Novo Pokémon
      name: "Clefairy",
      type: "Fada",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png",
      hp: 130,
      hpMax: 130,
      mp: 60,
      mpMax: 60,
      xp: 0,
      evoluiPara: "clefable",
      ataques: [
        { nome: "Bofetada Dupla", dano: 15, mana: 0 },
        { nome: "Luz Lunar", dano: 0, mana: 15 } // Cura HP
      ]
    },
    clefable: { // Novo Pokémon
      name: "Clefable",
      type: "Fada",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/36.png",
      hp: 160,
      hpMax: 160,
      mp: 90,
      mpMax: 90,
      xp: 0,
      evoluiPara: null,
      ataques: [
        { nome: "Poder Lunar", dano: 40, mana: 20 },
        { nome: "Metrônomo", dano: 0, mana: 25 } // Ataca aleatoriamente
      ]
    }
  };

  const tipos = {
    Fogo: { forte: "Planta", fraco: "Água" },
    Água: { forte: "Fogo", fraco: "Planta" },
    Planta: { forte: "Água", fraco: "Fogo" }
  };

  let playerPokemon = null;
  let enemyPokemon = null;

  function escolherPokemon(nome) {
    playerPokemon = JSON.parse(JSON.stringify(pokemons[nome]));
    enemyPokemon = JSON.parse(JSON.stringify(pokemons[getRandomEnemy(nome)]));
    iniciarBatalha();
  }

  function getRandomEnemy(exclude) {
    const keys = Object.keys(pokemons).filter(k => k !== exclude);
    return keys[Math.floor(Math.random() * keys.length)];
  }

  function iniciarBatalha() {
    document.getElementById("choose-pokemon").style.display = "none";
    document.getElementById("battle-area").style.display = "block";
    atualizarUI();
  }

  function atualizarUI() {
    document.getElementById("player-pokemon").textContent = playerPokemon.name;
    document.getElementById("enemy-pokemon").textContent = enemyPokemon.name;
    document.getElementById("player-img").src = playerPokemon.img;
    document.getElementById("enemy-img").src = enemyPokemon.img;

    document.getElementById("player-status").textContent = `HP: ${playerPokemon.hp}/${playerPokemon.hpMax} | MP: ${playerPokemon.mp}/${playerPokemon.mpMax}`;
    document.getElementById("enemy-status").textContent = `HP: ${enemyPokemon.hp}/${enemyPokemon.hpMax} | MP: ${enemyPokemon.mp}/${enemyPokemon.mpMax}`;

    document.getElementById("player-hp").style.width = (playerPokemon.hp / playerPokemon.hpMax * 100) + "%";
    document.getElementById("player-mp").style.width = (playerPokemon.mp / playerPokemon.mpMax * 100) + "%";
    document.getElementById("enemy-hp").style.width = (enemyPokemon.hp / enemyPokemon.hpMax * 100) + "%";
    document.getElementById("enemy-mp").style.width = (enemyPokemon.mp / enemyPokemon.mpMax * 100) + "%";

    const actions = document.getElementById("actions");
    actions.innerHTML = "";
    playerPokemon.ataques.forEach((atk, index) => {
      const btn = document.createElement("button");
      btn.textContent = `${atk.nome} (${atk.mana} MP)`;
      btn.disabled = atk.mana > playerPokemon.mp;
      btn.onclick = () => atacar(index);
      actions.appendChild(btn);
    });
  }

  function calcularDanoComTipo(atk, atacante, defensor) {
    let dano = atk.dano;
    if (tipos[atacante.type]?.forte === defensor.type) {
      dano *= 1.5;
    } else if (tipos[atacante.type]?.fraco === defensor.type) {
      dano *= 0.5;
    }
    return Math.floor(dano);
  }

  function atacar(indice) {
    const ataque = playerPokemon.ataques[indice];
    if (playerPokemon.mp < ataque.mana) return;

    playerPokemon.mp -= ataque.mana;
    const danoCausado = calcularDanoComTipo(ataque, playerPokemon, enemyPokemon);
    enemyPokemon.hp -= danoCausado;
    setMessage(`${playerPokemon.name} usou ${ataque.nome} e causou ${danoCausado} de dano!`);

    if (enemyPokemon.hp <= 0) {
      playerPokemon.xp += 50;
      setMessage(`${enemyPokemon.name} foi derrotado! Você ganhou 50 XP!`);
      verificarEvolucao();
      return;
    }

    setTimeout(() => inimigoAtaca(), 1000);
    atualizarUI();
  }

  function inimigoAtaca() {
    const ataque = enemyPokemon.ataques[Math.floor(Math.random() * enemyPokemon.ataques.length)];
    if (enemyPokemon.mp < ataque.mana) return;

    enemyPokemon.mp -= ataque.mana;
    const danoCausado = calcularDanoComTipo(ataque, enemyPokemon, playerPokemon);
    playerPokemon.hp -= danoCausado;
    setMessage(`${enemyPokemon.name} usou ${ataque.nome} e causou ${danoCausado} de dano!`);

    if (playerPokemon.hp <= 0) {
      setMessage(`${playerPokemon.name} foi derrotado!`);
      return;
    }

    atualizarUI();
  }

  function verificarEvolucao() {
    if (playerPokemon.evoluiPara && playerPokemon.xp >= 50) {
      const novaForm = pokemons[playerPokemon.evoluiPara];
      alert(`${playerPokemon.name} está evoluindo para ${novaForm.name}!`);
      playerPokemon = JSON.parse(JSON.stringify(novaForm));
      playerPokemon.hp = playerPokemon.hpMax;
      playerPokemon.mp = playerPokemon.mpMax;
      atualizarUI();
    }
  }

  function reiniciarJogo() {
    document.getElementById("choose-pokemon").style.display = "block";
    document.getElementById("battle-area").style.display = "none";
  }

  function setMessage(msg) {
    document.getElementById("message").textContent = msg;
  }

  window.onload = () => {
    const selector = document.getElementById("pokemon-selector");
    for (let key in pokemons) {
      const btn = document.createElement("button");
      const img = document.createElement("img");
      img.src = pokemons[key].img;
      img.style.height = "30px";
      btn.appendChild(img);
      btn.append(" " + pokemons[key].name);
      btn.onclick = () => escolherPokemon(key);
      selector.appendChild(btn);
    }
  };
