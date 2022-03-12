const utils = {
  copyArray(arr) {
    return [...arr.map(rows => [...rows])];
  },

  getDayOfTheYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return day;
  },

  getDayKey() {
    const d = new Date();
    const year = d.getFullYear();

    return `day-${this.getDayOfTheYear()}-${year}`;
  },
};

export default utils;
