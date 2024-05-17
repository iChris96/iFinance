const myBills = [
  {
    id: "01",
    title: "Amx Plat",
    created: "09/01/2023",
    state: "open",
  },
  {
    id: "02",
    title: "Amx Green",
    created: "09/01/2023",
    state: "archive",
  },
  {
    id: "02",
    title: "Amx Gold Octubre",
    created: "09/01/2023",
    state: "archive",
  },
  {
    id: "03",
    title: "NU Mayo",
    created: "09/01/2023",
    state: "archive",
  },
  {
    id: "03",
    title: "NU Abril",
    created: "09/01/2023",
    state: "archive",
  },
];

export default class BillingController {
  constructor() {
    this.items = myBills;
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    } else {
      throw new Error("Índice fuera de rango");
    }
  }

  getItem(index) {
    if (index >= 0 && index < this.items.length) {
      return this.items[index];
    } else {
      throw new Error("Índice fuera de rango");
    }
  }

  getAllItems() {
    return this.items;
  }
}
