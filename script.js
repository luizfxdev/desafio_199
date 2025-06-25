// Mapeamento completo de frases para filmes/séries
const phraseMap = {
  'Vingadores, avante!': 'Vingadores',
  'Isso não é uma lua.': 'Star Wars',
  'Bazinga!': 'The Big Bang Theory',
  'Aqui está olhando para você, garoto.': 'Casablanca',
  'Com grandes poderes vêm grandes responsabilidades.': 'Homem-Aranha',
  'Que a Força esteja com você.': 'Star Wars',
  'Por Asgard!': 'Thor',
  'Eu sou o seu pai.': 'Star Wars',
  'Eu sou inevitável.': 'Vingadores: Ultimato',
  'Você não passará!': 'O Senhor dos Anéis',
  'Por Gondor!': 'O Senhor dos Anéis',
  'Eu sou o Homem de Ferro.': 'Homem de Ferro',
  'A verdade está lá fora.': 'Arquivo X',
  'Bem-vindo à Matrix.': 'Matrix'
};

// Mapeamento completo de frases secretas (easter eggs)
const easterEggs = {
  assemble: { filme: 'Vingadores', tipo: 'filme' },
  bazinga: { filme: 'The Big Bang Theory', tipo: 'série' },
  força: { filme: 'Star Wars', tipo: 'filme' },
  asgard: { filme: 'Thor', tipo: 'filme' },
  'homem de ferro': { filme: 'Homem de Ferro', tipo: 'filme' },
  matrix: { filme: 'Matrix', tipo: 'filme' },
  'não passará': { filme: 'O Senhor dos Anéis', tipo: 'filme' },
  verdade: { filme: 'Arquivo X', tipo: 'série' },
  vingadores: { filme: 'Vingadores', tipo: 'filme' },
  lua: { filme: 'Star Wars', tipo: 'filme' },
  poderes: { filme: 'Homem-Aranha', tipo: 'filme' },
  pai: { filme: 'Star Wars', tipo: 'filme' },
  inevitável: { filme: 'Vingadores: Ultimato', tipo: 'filme' },
  gondor: { filme: 'O Senhor dos Anéis', tipo: 'filme' }
};

// Informações completas sobre conquistas
const achievements = {
  Vingadores: {
    premios: "MTV Movie Award de Melhor Filme, People's Choice Award de Filme Favorito",
    bilheteria: 'US$ 1,519 bilhão',
    nota: 'O filme que uniu os heróis da Marvel em uma batalha épica.'
  },
  'Star Wars': {
    premios: 'Oscar de Melhor Figurino, Melhor Edição de Som, Melhor Trilha Sonora',
    bilheteria: 'US$ 775 milhões (original em 1977)',
    nota: 'Uma das franquias mais lucrativas e influentes da história do cinema.'
  },
  'The Big Bang Theory': {
    premios: '7 Emmy Awards, 1 Golden Globe',
    episodios: '279 episódios',
    temporadas: '12 temporadas',
    nota: 'Uma das séries de comédia mais populares da TV americana.'
  },
  Casablanca: {
    premios: '3 Oscars incluindo Melhor Filme, Melhor Diretor e Melhor Roteiro Adaptado',
    bilheteria: 'US$ 3,7 milhões (em 1942)',
    nota: 'Considerado um dos melhores filmes de todos os tempos.'
  },
  'Homem-Aranha': {
    premios: 'Oscar de Melhores Efeitos Visuais (2002)',
    bilheteria: 'US$ 825 milhões (trilogia original)',
    nota: 'O herói mais popular da Marvel no cinema.'
  },
  Thor: {
    premios: 'Saturn Award de Melhor Figurino',
    bilheteria: 'US$ 449,3 milhões (Thor: Ragnarok)',
    nota: 'O deus nórdico do trovão no Universo Cinematográfico Marvel.'
  },
  'Vingadores: Ultimato': {
    premios: "People's Choice Award de Filme do Ano",
    bilheteria: 'US$ 2,798 bilhões (maior bilheteria da história)',
    nota: 'O épico final da Saga do Infinito da Marvel.'
  },
  'O Senhor dos Anéis': {
    premios: '17 Oscars (trilogia), incluindo Melhor Filme para O Retorno do Rei',
    bilheteria: 'US$ 2,991 bilhões (trilogia combinada)',
    nota: 'Uma das maiores realizações do cinema fantástico.'
  },
  'Homem de Ferro': {
    premios: 'Saturn Award de Melhor Filme de Ficção Científica',
    bilheteria: 'US$ 585,2 milhões (Homem de Ferro 3)',
    nota: 'O filme que lançou o Universo Cinematográfico Marvel.'
  },
  'Arquivo X': {
    premios: '16 Emmy Awards, 5 Golden Globes',
    episodios: '218 episódios',
    temporadas: '11 temporadas',
    nota: 'Uma das séries de ficção científica mais influentes da TV.'
  },
  Matrix: {
    premios: '4 Oscars incluindo Melhores Efeitos Visuais',
    bilheteria: 'US$ 463,5 milhões (filme original)',
    nota: 'Revolucionou os efeitos visuais e a narrativa de ação.'
  }
};

// Função para encontrar easter eggs em uma frase
function findEasterEggs(phrase) {
  const result = {};
  const lowerPhrase = phrase.toLowerCase();

  for (const [egg, info] of Object.entries(easterEggs)) {
    const regex = new RegExp(`\\b${egg}\\b`, 'gi');
    const matches = lowerPhrase.match(regex);

    if (matches) {
      const key = info.tipo === 'série' ? 'série' : 'filme';
      result[egg] = {
        ocorrencias: matches.length,
        [key]: info.filme
      };
    }
  }

  return result;
}

// Função para exibir os resultados
function displayResults(phrase) {
  const resultadoDiv = document.getElementById('resultado');
  const conquistasDiv = document.getElementById('conquistas');

  if (!phrase) {
    resultadoDiv.innerHTML = '<p>Selecione uma frase e clique em REVELAR para descobrir os Easter Eggs!</p>';
    conquistasDiv.innerHTML = '';
    return;
  }

  const eggsFound = findEasterEggs(phrase);
  const movie = phraseMap[phrase];

  if (Object.keys(eggsFound).length === 0) {
    resultadoDiv.innerHTML = `<p>Nenhum Easter Egg encontrado na frase: <strong>"${phrase}"</strong></p>`;
  } else {
    let html = '<h3>Easter Egg encontrado:</h3>';

    for (const [egg, info] of Object.entries(eggsFound)) {
      html += `<pre>"${egg}": ${JSON.stringify(info, null, 2)}</pre>`;
    }

    resultadoDiv.innerHTML = html;
  }

  // Exibir informações adicionais
  if (movie && achievements[movie]) {
    const movieInfo = achievements[movie];
    let achievementsHtml = '<div class="movie-info"><h3>Conquistas:</h3><ul>';

    if (movieInfo.premios) {
      achievementsHtml += `<li><strong>Prêmios:</strong> ${movieInfo.premios}</li>`;
    }

    if (movieInfo.bilheteria) {
      achievementsHtml += `<li><strong>Bilheteria:</strong> ${movieInfo.bilheteria}</li>`;
    }

    if (movieInfo.episodios) {
      achievementsHtml += `<li><strong>Episódios:</strong> ${movieInfo.episodios}</li>`;
    }

    if (movieInfo.temporadas) {
      achievementsHtml += `<li><strong>Temporadas:</strong> ${movieInfo.temporadas}</li>`;
    }

    if (movieInfo.nota) {
      achievementsHtml += `<li><em>${movieInfo.nota}</em></li>`;
    }

    achievementsHtml += '</ul></div>';
    conquistasDiv.innerHTML = achievementsHtml;
  } else {
    conquistasDiv.innerHTML = '';
  }
}

// Função para tocar som com tratamento de erros
async function playSound(soundElement) {
  try {
    soundElement.currentTime = 0; // Reinicia o áudio
    await soundElement.play();
  } catch (err) {
    console.error('Erro ao reproduzir som:', err);

    // Tentativa alternativa com mute
    try {
      soundElement.muted = true;
      await soundElement.play();
      soundElement.muted = false;
    } catch (err2) {
      console.error('Falha na reprodução mesmo com mute:', err2);
    }
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const revelarBtn = document.getElementById('revelar');
  const voltarBtn = document.getElementById('voltar');
  const fraseSelect = document.getElementById('frase');
  const sound1 = document.getElementById('sound1');
  const sound2 = document.getElementById('sound2');

  // Verificação de carregamento dos áudios
  [sound1, sound2].forEach(sound => {
    sound.addEventListener('error', () => {
      console.error(`Erro ao carregar áudio: ${sound.src}`);
    });

    sound.addEventListener('canplaythrough', () => {
      console.log(`Áudio carregado e pronto: ${sound.src}`);
    });
  });

  revelarBtn.addEventListener('click', () => {
    const selectedPhrase = fraseSelect.value;
    playSound(sound1);
    displayResults(selectedPhrase);
  });

  voltarBtn.addEventListener('click', () => {
    playSound(sound2);
    fraseSelect.value = '';
    displayResults('');
  });

  // Debug: expõe os elementos de áudio no console para teste manual
  console.log('Elementos de áudio disponíveis:', { sound1, sound2 });
});
