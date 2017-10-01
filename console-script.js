var objs = $$(".ledgerTable tr")
  .map(item => item.getElementsByTagName("td"))
  .filter(cells => cells.length === 5)
  .map(cells => ({
    date: cells[0].textContent,
    desc: cells[1].textContent,
    charges: cells[2].textContent
  }))
  .filter(row => row.desc.includes(" for "))
  .map(row => ({
    ...row,
    desc: row.desc.split(" for ")[0],
    charges: parseFloat(row.charges.slice(1), 10)
  }))
  .reduce((acc, row) => {
    if (!acc[row.date]) {
      acc[row.date] = {};
    }

    acc[row.date][row.desc] = row.charges;

    return acc;
  }, {})

objs = Object.keys(objs).map(date => ({
  date,
  ...objs[date]
}));

JSON.stringify(objs);
