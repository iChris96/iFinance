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
    id: "04",
    title: "NU Abril",
    created: "09/01/2023",
    state: "archive",
  },
];

class BillingController {
  constructor() {
    if (!BillingController.instance) {
      this.items = myBills;
      BillingController.instance = this;
    }

    // eslint-disable-next-line no-constructor-return
    return BillingController.instance;
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(index) {
    if (index < 0 || index > this.items.length) {
      throw new Error("index out of range..");
    }
    this.items.splice(index, 1);
  }

  getItem(index) {
    if (index >= 0 && index < this.items.length) {
      return this.items[index];
    }
    throw new Error("index out of range..");
  }

  getAllItems() {
    return this.items;
  }
}

const instance = new BillingController();
Object.freeze(instance);

export default instance;
