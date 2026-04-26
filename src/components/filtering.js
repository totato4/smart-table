import { createComparison, defaultRules } from '../lib/compare.js';

// @todo: #4.3 — настроить компаратор

export function initFiltering(elements, indexes) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  Object.keys(indexes).forEach((elementName) => {
    elements[elementName].append(
      ...Object.values(indexes[elementName]).map((name) => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        return option;
      })
    );
  });

  const compare = createComparison(defaultRules);

  return (data, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    if (action && action.name === 'clear') {
      const field = action.dataset.field;
      const input = action.parentElement.querySelector('input');
      if (input) {
        input.value = '';
        state[field] = '';
      }
    }

    // @todo: #4.5 — отфильтровать данные используя компаратор
    const totalFrom = parseFloat(state.totalFrom);
    const totalTo = parseFloat(state.totalTo);

    const filterState = { ...state };

    if (!isNaN(totalFrom) || !isNaN(totalTo)) {
      filterState.total = [totalFrom || '', totalTo || ''];
    }

    return data.filter((row) => compare(row, filterState));
  };
}
