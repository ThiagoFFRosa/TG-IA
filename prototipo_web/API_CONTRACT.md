# Contrato da API de predição

Este documento descreve o contrato esperado para o backend futuro do protótipo web de classificação da categoria de peso ao nascer. O backend ainda não está implementado neste repositório.

## Endpoint

```http
POST /api/predict
Content-Type: application/json
```

## Request

O corpo da requisição deve ser um JSON contendo todas as features esperadas pelo modelo, na mesma ordem descrita em `modelo_final_prototipo/features_modelo_final.json`.

Campos sem informação devem ser enviados como `null`.

### Exemplo

```json
{
  "LOCNASC": null,
  "IDADEMAE": 27,
  "ESTCIVMAE": null,
  "ESCMAE": null,
  "ESCMAE2010": null,
  "ESCMAEAGR1": null,
  "RACACORMAE": null,
  "QTDFILVIVO": null,
  "QTDFILMORT": null,
  "QTDGESTANT": null,
  "QTDPARTNOR": null,
  "QTDPARTCES": null,
  "GESTACAO": null,
  "SEMAGESTAC": 39,
  "GRAVIDEZ": null,
  "PARTO": null,
  "CONSULTAS": null,
  "CONSPRENAT": 8,
  "MESPRENAT": null,
  "TPAPRESENT": null,
  "STTRABPART": null,
  "STCESPARTO": null,
  "TPNASCASSI": null,
  "PARIDADE": null,
  "KOTELCHUCK": null,
  "SEXO": null,
  "RACACOR": null,
  "APGAR1": null,
  "APGAR5": null,
  "IDANOMAL": null
}
```

## Response esperada

```json
{
  "classe_prevista": "adequado",
  "probabilidades": {
    "baixo_peso": 0.12,
    "adequado": 0.78,
    "macrossomia": 0.10
  },
  "modo": "real"
}
```

### Campos da resposta

- `classe_prevista`: classe final retornada pelo modelo. Valores esperados: `baixo_peso`, `adequado` ou `macrossomia`.
- `probabilidades`: objeto com a probabilidade estimada para cada classe.
- `modo`: deve ser `real` quando a resposta vier do backend executando o modelo.

## Response de erro

```json
{
  "erro": "Mensagem explicando o erro"
}
```

## Observações de integração

- O frontend envia a requisição para `/api/predict`.
- Enquanto o backend não existir, o frontend exibe um resultado simulado em modo demonstração quando a chamada falha.
- O backend futuro deve carregar o modelo `.joblib` fora do versionamento do Git e preservar a ordem das features definida em `features_modelo_final.json`.
