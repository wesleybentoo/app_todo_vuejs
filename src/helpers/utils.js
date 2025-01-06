/**
 * Este é um arquivo que contem funções utilitárias.
 * Siga o padrão de descrição de funções.
 */


/**
 * @description Regras de validação de inputs.
 */
const inputRules = {
  required: (value) => !!value || "Obrigatório",
  min: (value) => value.length >= 3 || "Min de caracteres é 3",
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Email inválido";
  },
};

// ------------------------------------------------------------------------------------------

/**
 * @description Corta uma string em um determinado tamanho.
 * @param {string} string string a ser cortada.
 * @param {string} size tamanho da string.
 * @returns {string} string cortada.
 */
const excerpt = (string, size = 30) => {
  if (string.length > size) {
    string = string.substring(0, size) + "...";
  }
  return string;
};

// ------------------------------------------------------------------------------------------

/**
 * @description Formata uma data de DD/MM/YYYY para YYYY-MM-DD
 * @param {string} date data.
 * @param {string} time tempo.
 * @throws {Error} Caso a data seja nula ou invalida.
 * @returns {string} data formatada.
 */
const formatDateDMYtoYMD = (date, time) => {
  if (!date) throw new Error("data não pode ser nula");

  const testDate =
    /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  if (!testDate.test(date)) throw new Error("data inválida");

  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day} ${time ? time : ""}`;
};

// ------------------------------------------------------------------------------------------

/**
 * @description Formata uma data de YYYY-MM-DD para DD/MM/YYYY
 * @param {string} date data.
 * @param {string} time tempo.
 * @returns {string} data formatada.
 */

const formatDateYMDtoDMY = (date) => {
  if (date) {
    const ex1 = date.split(' ')
    const ex2 = ex1[0].split('-')
    const ex3 = ex1[1].split(':')
    return ex2[2] + '/' + ex2[1] + '/' + ex2[0] + ' ' + ex3[0] + ':' + ex3[1]
  }
  return '--'
}


export { inputRules, formatDateDMYtoYMD, excerpt, formatDateYMDtoDMY };
