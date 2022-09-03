import { useCallback, useState } from "react";
class CostManager {
  static #userMap = new Map();

  static #getUsersMap(userId) {
    if (!this.#userMap.has(userId)) this.#userMap.set(userId, new Map());
    return this.#userMap.get(userId);
  }
  static addCost(userId, costItem) {
    this.#getUsersMap(userId).set(costItem.costID, costItem);
  }

  static removeCost(userId, costId) {
    this.#getUsersMap(userId).remove(costId);
  }

  static getCosts(userId) {
    return [...this.#getUsersMap(userId).values()];
  }
}

const initialSortFn = (a, b) => a.timestamp - b.timestamp;
const initialFilterFn = (x) => true;

const useCostManager = (userId, options) => {
  const [costs, setCosts] = useState(userId ? CostManager.getCosts(userId) : []);
  const filterFn = options?.filterFn ?? initialFilterFn;
  const sortFn = options?.sortFn ?? initialSortFn;
  const refreshCosts = useCallback(() => {
    setCosts(CostManager.getCosts(userId).filter(filterFn).sort(sortFn));
  }, [userId, filterFn, sortFn]);

  const addCost = useCallback(
    (costItem) => {
      CostManager.addCost(userId, costItem);
      refreshCosts();
    },
    [userId, refreshCosts],
  );

  const removeCost = useCallback(
    (costId) => {
      CostManager.removeCost(userId, costId);
      refreshCosts();
    },
    [userId, refreshCosts],
  );

  return {
    costs,

    addCost,
    removeCost,
    refreshCosts,
  };
};

export default useCostManager;
