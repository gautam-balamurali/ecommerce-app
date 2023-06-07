const filterListBySearchValue = (list, searchValue) =>
  list.filter(
    (elm) =>
      elm.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      elm.categoryName.toLowerCase().includes(searchValue.toLowerCase()) ||
      elm[searchValue.toLowerCase()]
  );

const filterListByCategoryCheckbox = (list, categoryCheckboxValues) =>
  categoryCheckboxValues.length < 1
    ? list
    : list.filter((elm) =>
        categoryCheckboxValues.some(
          (checkboxValue) => checkboxValue === elm.categoryName
        )
      );

const filterListByBooleanCheckbox = (list, booleanCheckboxValues) =>
  booleanCheckboxValues.length < 1
    ? list
    : list.filter((elm) =>
        booleanCheckboxValues.some((checkboxValue) => elm[checkboxValue])
      );

const sortListByOrder = (list, order) =>
  order.length < 1
    ? list
    : [...list].sort((a, b) =>
        order === "ascending" ? a.price - b.price : b.price - a.price
      );

const sortByRange = (list, rangeValue) =>
  list.filter((elm) => elm.rating >= Number(rangeValue));

export const updateListWithAppliedFilters = (
  productsList,
  appliedFilterValues
) => {
  let filteredProductsList = [...productsList];
  // Apply search filter
  filteredProductsList = filterListBySearchValue(
    filteredProductsList,
    appliedFilterValues.searchValue
  );
  // Apply categories checkbox filter
  filteredProductsList = filterListByCategoryCheckbox(
    filteredProductsList,
    appliedFilterValues.categoryCheckboxValues
  );
  // Apply boolean checkbox filter
  filteredProductsList = filterListByBooleanCheckbox(
    filteredProductsList,
    appliedFilterValues.booleanCheckboxValues
  );
  // Apply in stock checkbox filter
  filteredProductsList = filterListByBooleanCheckbox(
    filteredProductsList,
    appliedFilterValues.inStockCheckboxValue
  );
  // Apply radio filter
  filteredProductsList = sortListByOrder(
    filteredProductsList,
    appliedFilterValues.radioButtonValue
  );
  // Apply range filter
  filteredProductsList = sortByRange(
    filteredProductsList,
    appliedFilterValues.rangeValue
  );
  return filteredProductsList;
};
