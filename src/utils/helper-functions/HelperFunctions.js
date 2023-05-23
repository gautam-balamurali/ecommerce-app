const filterListBySearchValue = (list, searchValue) =>
  list.filter(
    (elm) =>
      elm.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      elm.author.toLowerCase().includes(searchValue.toLowerCase()) ||
      elm.categoryName.toLowerCase().includes(searchValue.toLowerCase())
  );

const filterListByCheckbox = (list, checkboxValues) =>
  checkboxValues.length < 1
    ? list
    : list.filter((elm) =>
        checkboxValues.some(
          (checkboxValue) => checkboxValue === elm.categoryName
        )
      );

const sortListByOrder = (list, order) =>
  order.length < 1
    ? list
    : [...list].sort((a, b) =>
        order === "ascending" ? a.price - b.price : b.price - a.price
      );

const sortByRange = (list, rangeValue) =>
  list.filter((elm) => elm.rating <= Number(rangeValue));

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
  // Apply checkbox filter
  filteredProductsList = filterListByCheckbox(
    filteredProductsList,
    appliedFilterValues.checkboxValues
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
