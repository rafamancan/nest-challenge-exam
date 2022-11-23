import * as yup from 'yup';

const digitsOnly = (value) => /^\d+$/.test(value);

export const yupCreateExamInput = yup.object().shape({
  codigo_amostra: yup
    .string()
    .required()
    .min(1)
    .max(8)
    .test('digitsOnly', 'codigo_amostra must contain only digits', digitsOnly),
  cocaina: yup.number().required(),
  anfetamina: yup.number().required(),
  metanfetamina: yup.number().required(),
  mda: yup.number().required(),
  mdma: yup.number().required(),
  thc: yup.number().required(),
  morfina: yup.number().required(),
  codeina: yup.number().required(),
  heroina: yup.number().required(),
  benzoilecgonina: yup.number().required(),
  cocaetileno: yup.number().required(),
  norcocaina: yup.number().required(),
});
