const FEATURES_URL = '../../modelo_final_prototipo/features_modelo_final.json';
const DICTIONARY_URL = '../../modelo_final_prototipo/dicionario_campos.json';
const OPTIONS_URL = '../../modelo_final_prototipo/opcoes_campos.json';
const TARGET_CLASSES = ['baixo_peso', 'adequado', 'macrossomia'];

const fallbackFeatures = [
  'LOCNASC', 'IDADEMAE', 'ESTCIVMAE', 'ESCMAE', 'ESCMAE2010', 'ESCMAEAGR1', 'RACACORMAE',
  'QTDFILVIVO', 'QTDFILMORT', 'QTDGESTANT', 'QTDPARTNOR', 'QTDPARTCES', 'GESTACAO',
  'SEMAGESTAC', 'GRAVIDEZ', 'PARTO', 'CONSULTAS', 'CONSPRENAT', 'MESPRENAT', 'TPAPRESENT',
  'STTRABPART', 'STCESPARTO', 'TPNASCASSI', 'PARIDADE', 'KOTELCHUCK', 'SEXO', 'RACACOR',
  'APGAR1', 'APGAR5', 'IDANOMAL'
];

const fallbackDictionary = {
  LOCNASC: { nome: 'Local de nascimento', grupo: 'Dados do nascimento', tipo: 'categorico', descricao: 'Indica o local onde ocorreu o nascimento, como hospital, domicílio ou outro estabelecimento.', observacao: 'Pode refletir características assistenciais ou administrativas.', permite_nao_informado: true },
  IDADEMAE: { nome: 'Idade da mãe', grupo: 'Dados maternos', tipo: 'numerico', descricao: 'Idade da mãe no momento do nascimento.', min: 10, max: 60, permite_nao_informado: true },
  ESTCIVMAE: { nome: 'Estado civil da mãe', grupo: 'Dados maternos', tipo: 'categorico', descricao: 'Código referente ao estado civil da mãe conforme registro do SINASC.', permite_nao_informado: true },
  ESCMAE: { nome: 'Escolaridade da mãe', grupo: 'Dados maternos', tipo: 'categorico', descricao: 'Código de escolaridade da mãe conforme registro original.', permite_nao_informado: true },
  ESCMAE2010: { nome: 'Escolaridade da mãe 2010', grupo: 'Dados maternos', tipo: 'categorico', descricao: 'Classificação de escolaridade da mãe no padrão SINASC 2010.', permite_nao_informado: true },
  ESCMAEAGR1: { nome: 'Escolaridade agregada da mãe', grupo: 'Dados maternos', tipo: 'categorico', descricao: 'Classificação agregada de escolaridade da mãe.', permite_nao_informado: true },
  RACACORMAE: { nome: 'Raça/cor da mãe', grupo: 'Dados maternos', tipo: 'categorico', descricao: 'Código referente à raça/cor da mãe.', observacao: 'Variável sensível; deve ser interpretada com cautela.', permite_nao_informado: true },
  QTDFILVIVO: { nome: 'Quantidade de filhos vivos', grupo: 'Histórico gestacional', tipo: 'numerico', descricao: 'Quantidade de filhos vivos anteriores informados no registro.', min: 0, max: 20, permite_nao_informado: true },
  QTDFILMORT: { nome: 'Quantidade de filhos mortos', grupo: 'Histórico gestacional', tipo: 'numerico', descricao: 'Quantidade de filhos mortos anteriores informados no registro.', min: 0, max: 20, permite_nao_informado: true },
  QTDGESTANT: { nome: 'Quantidade de gestações anteriores', grupo: 'Histórico gestacional', tipo: 'numerico', descricao: 'Quantidade de gestações anteriores registradas.', min: 0, max: 20, permite_nao_informado: true },
  QTDPARTNOR: { nome: 'Quantidade de partos normais', grupo: 'Histórico gestacional', tipo: 'numerico', descricao: 'Quantidade de partos vaginais anteriores.', min: 0, max: 20, permite_nao_informado: true },
  QTDPARTCES: { nome: 'Quantidade de cesáreas', grupo: 'Histórico gestacional', tipo: 'numerico', descricao: 'Quantidade de partos cesáreos anteriores.', min: 0, max: 20, permite_nao_informado: true },
  GESTACAO: { nome: 'Faixa de duração da gestação', grupo: 'Gestação e pré-natal', tipo: 'categorico', descricao: 'Faixa categórica da duração da gestação conforme registro do SINASC.', permite_nao_informado: true },
  SEMAGESTAC: { nome: 'Semanas de gestação', grupo: 'Gestação e pré-natal', tipo: 'numerico', descricao: 'Número estimado de semanas completas de gestação.', min: 20, max: 45, permite_nao_informado: true },
  GRAVIDEZ: { nome: 'Tipo de gravidez', grupo: 'Gestação e pré-natal', tipo: 'categorico', descricao: 'Indica se a gravidez foi única, dupla, tripla ou mais, conforme código do SINASC.', permite_nao_informado: true },
  PARTO: { nome: 'Tipo de parto', grupo: 'Parto', tipo: 'categorico', descricao: 'Tipo de parto registrado, como vaginal ou cesáreo.', observacao: 'Informação associada ao momento do parto.', permite_nao_informado: true },
  CONSULTAS: { nome: 'Faixa de consultas de pré-natal', grupo: 'Gestação e pré-natal', tipo: 'categorico', descricao: 'Faixa categórica da quantidade de consultas de pré-natal.', permite_nao_informado: true },
  CONSPRENAT: { nome: 'Quantidade de consultas de pré-natal', grupo: 'Gestação e pré-natal', tipo: 'numerico', descricao: 'Quantidade registrada de consultas de pré-natal.', min: 0, max: 50, permite_nao_informado: true },
  MESPRENAT: { nome: 'Mês de início do pré-natal', grupo: 'Gestação e pré-natal', tipo: 'numerico', descricao: 'Mês da gestação em que o pré-natal foi iniciado.', min: 0, max: 9, permite_nao_informado: true },
  TPAPRESENT: { nome: 'Tipo de apresentação', grupo: 'Parto', tipo: 'categorico', descricao: 'Tipo de apresentação fetal registrado no nascimento.', permite_nao_informado: true },
  STTRABPART: { nome: 'Trabalho de parto', grupo: 'Parto', tipo: 'categorico', descricao: 'Indica informações relacionadas ao trabalho de parto.', permite_nao_informado: true },
  STCESPARTO: { nome: 'Cesárea antes do trabalho de parto', grupo: 'Parto', tipo: 'categorico', descricao: 'Informação relacionada à ocorrência de cesárea antes do trabalho de parto.', permite_nao_informado: true },
  TPNASCASSI: { nome: 'Tipo de nascimento assistido', grupo: 'Parto', tipo: 'categorico', descricao: 'Tipo de assistência registrada no nascimento.', permite_nao_informado: true },
  PARIDADE: { nome: 'Paridade', grupo: 'Histórico gestacional', tipo: 'categorico', descricao: 'Indica se a mãe possui histórico de parto anterior, conforme registro da base.', permite_nao_informado: true },
  KOTELCHUCK: { nome: 'Índice de Kotelchuck', grupo: 'Gestação e pré-natal', tipo: 'categorico', descricao: 'Indicador relacionado à adequação do acompanhamento pré-natal.', permite_nao_informado: true },
  SEXO: { nome: 'Sexo do recém-nascido', grupo: 'Recém-nascido', tipo: 'categorico', descricao: 'Sexo do recém-nascido conforme registro do SINASC.', permite_nao_informado: true },
  RACACOR: { nome: 'Raça/cor do recém-nascido', grupo: 'Recém-nascido', tipo: 'categorico', descricao: 'Código referente à raça/cor do recém-nascido.', observacao: 'Variável sensível; deve ser interpretada com cautela.', permite_nao_informado: true },
  APGAR1: { nome: 'Apgar no 1º minuto', grupo: 'Recém-nascido', tipo: 'numerico', descricao: 'Índice de Apgar no primeiro minuto após o nascimento.', observacao: 'Dado obtido após o nascimento.', min: 0, max: 10, permite_nao_informado: true },
  APGAR5: { nome: 'Apgar no 5º minuto', grupo: 'Recém-nascido', tipo: 'numerico', descricao: 'Índice de Apgar no quinto minuto após o nascimento.', observacao: 'Dado obtido após o nascimento.', min: 0, max: 10, permite_nao_informado: true },
  IDANOMAL: { nome: 'Anomalia congênita identificada', grupo: 'Recém-nascido', tipo: 'categorico', descricao: 'Indica se foi registrada anomalia congênita.', permite_nao_informado: true }
};

let modelFeatures = [];
let fieldDictionary = {};
let fieldOptions = {};

const form = document.querySelector('#prediction-form');
const groupsContainer = document.querySelector('#form-groups');
const statusMessage = document.querySelector('#status-message');
const notice = document.querySelector('.notice');

async function loadJson(url) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Falha ao carregar ${url}`);
  return response.json();
}

async function initialize() {
  try {
    [modelFeatures, fieldDictionary] = await Promise.all([loadJson(FEATURES_URL), loadJson(DICTIONARY_URL)]);
  } catch (error) {
    modelFeatures = fallbackFeatures;
    fieldDictionary = fallbackDictionary;
    notice.classList.add('warning');
    statusMessage.textContent = 'Não foi possível carregar a lista de features ou o dicionário via fetch. Usando metadados embutidos para permitir teste local; ao servir por HTTP, os arquivos externos serão utilizados.';
  }

  try {
    fieldOptions = await loadJson(OPTIONS_URL);
    if (!notice.classList.contains('warning')) {
      statusMessage.textContent = 'Arquivos do modelo e opções dos campos carregados dinamicamente com sucesso.';
    }
  } catch (error) {
    fieldOptions = {};
    const coreFilesUnavailable = notice.classList.contains('warning');
    notice.classList.add('warning');
    const optionsFallbackMessage = 'As opções amigáveis não puderam ser carregadas; os campos categóricos permanecerão disponíveis para informar o código SINASC.';
    statusMessage.textContent = coreFilesUnavailable
      ? `${statusMessage.textContent} ${optionsFallbackMessage}`
      : optionsFallbackMessage;
  }
  renderForm();
}

function renderForm() {
  const grouped = modelFeatures.reduce((acc, feature) => {
    const meta = fieldDictionary[feature] || {};
    const group = meta.grupo || 'Outros campos';
    acc[group] = acc[group] || [];
    acc[group].push({ feature, meta });
    return acc;
  }, {});

  groupsContainer.innerHTML = Object.entries(grouped).map(([group, fields]) => `
    <fieldset class="group-card">
      <legend><h3>${group}</h3></legend>
      <div class="fields-grid">
        ${fields.map(renderField).join('')}
      </div>
    </fieldset>
  `).join('');
}

function renderField({ feature, meta }) {
  const min = meta.min !== undefined ? `min="${meta.min}"` : '';
  const max = meta.max !== undefined ? `max="${meta.max}"` : '';
  const options = fieldOptions[feature];
  let input;
  let hint = '';

  if (meta.tipo === 'numerico') {
    input = `<input id="${feature}" name="${feature}" type="number" step="1" ${min} ${max} placeholder="${meta.permite_nao_informado ? 'Não informado' : 'Informe um valor'}" />`;
  } else if (Array.isArray(options)) {
    input = `
      <select id="${feature}" name="${feature}">
        <option value="">Não informado</option>
        ${options.map((option) => `<option value="${option.valor}"${option.descricao ? ` title="${option.descricao}"` : ''}>${option.rotulo}</option>`).join('')}
      </select>`;
    hint = 'Selecione uma opção. Caso não saiba, deixe como Não informado.';
  } else {
    input = `<input id="${feature}" name="${feature}" type="text" inputmode="numeric" placeholder="Não informado ou código SINASC" />`;
    hint = 'Informe o código SINASC, se conhecido. Deixe vazio para enviar como null.';
  }

  return `
    <article class="field">
      <div class="field__top">
        <label for="${feature}">${meta.nome || feature}</label>
        <span class="code">${feature}</span>
      </div>
      <p class="description">${meta.descricao || 'Descrição não informada no dicionário.'}</p>
      ${meta.observacao ? `<p class="observation"><strong>Obs.:</strong> ${meta.observacao}</p>` : ''}
      ${input}
      ${hint ? `<p class="hint">${hint}</p>` : ''}
    </article>
  `;
}

function parseValue(feature) {
  const input = form.elements[feature];
  const rawValue = input.value.trim();
  if (rawValue === '') return null;
  return fieldDictionary[feature]?.tipo === 'numerico' ? Number(rawValue) : rawValue;
}

function buildPayload() {
  return modelFeatures.reduce((payload, feature) => {
    payload[feature] = parseValue(feature);
    return payload;
  }, {});
}

async function requestPrediction(payload) {
  const response = await fetch('/api/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error('Backend indisponível ou retornou erro.');
  return response.json();
}

function mockPrediction() {
  return {
    classe_prevista: 'adequado',
    probabilidades: { baixo_peso: 0.12, adequado: 0.78, macrossomia: 0.10 },
    modo: 'demonstração'
  };
}

function renderResult(result) {
  const isDemo = result.modo !== 'real';
  const card = document.querySelector('#result-card');
  card.classList.toggle('demo', isDemo);
  card.classList.remove('hidden');
  document.querySelector('#result-mode').textContent = isDemo ? 'Modo demonstração • backend ainda não conectado' : 'Modo real';
  document.querySelector('#predicted-class').textContent = result.classe_prevista || 'Sem classe retornada';
  document.querySelector('#probabilities').innerHTML = TARGET_CLASSES.map((classe) => {
    const probability = Number(result.probabilidades?.[classe] ?? 0);
    const percent = Math.round(probability * 100);
    return `<div class="probability"><div class="probability__label"><span>${classe}</span><span>${percent}%</span></div><div class="probability__bar"><div class="probability__fill" style="width: ${percent}%"></div></div></div>`;
  }).join('');
  document.querySelector('#interpretation').textContent = `Interpretação: o modelo indica maior compatibilidade com a categoria "${result.classe_prevista}" para os dados informados.`;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const payload = buildPayload();
  try {
    renderResult(await requestPrediction(payload));
  } catch (error) {
    renderResult(mockPrediction());
  }
});

document.querySelector('#clear-form').addEventListener('click', () => {
  form.reset();
  document.querySelector('#result-card').classList.add('hidden');
});

document.querySelector('#fill-example').addEventListener('click', () => {
  const example = { IDADEMAE: 27, SEMAGESTAC: 39, CONSPRENAT: 8, APGAR1: 8, APGAR5: 9, MESPRENAT: 2 };
  modelFeatures.forEach((feature) => {
    form.elements[feature].value = example[feature] ?? '';
  });
});

initialize();
