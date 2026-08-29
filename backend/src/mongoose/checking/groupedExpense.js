// 示例数据
const transactions = [
  { date: "2024-12-24", name: ": Hi :", category: "Shopping", amount: -29.62, report: "Report #1" },
  { date: "2024-12-24", name: "Holiland 37jr", category: "Eating Out", amount: -40.00, report: "Report #1" },
  { date: "2024-12-13", name: "New World Metro", category: "Groceries", amount: -55.92, report: "Report #1" },
];

// 分组逻辑
const groupedExpense = transactions.reduce((acc, transaction) => {
  const date = transaction.date;
  if (!acc[date]) acc[date] = [];
  acc[date].push(transaction);
  return acc;
}, {});

console.log(groupedExpense);
/*
输出：
{
  "2024-12-24": [
    { date: "2024-12-24", name: ": Hi :", category: "Shopping", amount: -29.62, report: "Report #1" },
    { date: "2024-12-24", name: "Holiland 37jr", category: "Eating Out", amount: -40.00, report: "Report #1" }
  ],
  "2024-12-13": [
    { date: "2024-12-13", name: "New World Metro", category: "Groceries", amount: -55.92, report: "Report #1" }
  ]
}
*/
