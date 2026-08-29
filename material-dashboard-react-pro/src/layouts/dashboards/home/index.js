// @mui material components
import {useEffect, useState} from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import FilterModal from "./components/filterModal/FilterModal";
import {
  Avatar,
  Card,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import CrudService from "services/cruds-service";
// import TransactionCard from "./components/TransactionCard"; // 引入 TransactionCard 组件
import DetailPageModal from "./components/detailModal/DetailPageModal";
import {useNavigate} from "react-router-dom"; // 引入 DetailPageModal 组件

function Home() {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [transactions, setTransactions] = useState([]);
  const [groupedTransactions, setGroupedTransactions] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [swipedItemId, setSwipedItemId] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await CrudService.getTransactions();
      setTransactions(response.data);
    })();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const filteredTransactions = transactions.filter((transaction) => {
      const shopName = transaction.attributes.shop.name.toLowerCase();
      const transactionCategory = transaction.attributes.shop.category.toLowerCase();
      const query = searchQuery.toLowerCase();

      // 应用搜索过滤
      const matchesSearch = shopName.includes(query) || transactionCategory.includes(query);

      // 应用类别过滤
      const matchesCategory = selectedCategories.length === 0 ||
        selectedCategories.includes(transaction.attributes.shop.category);

      return matchesSearch && matchesCategory;
    });

    const filteredAndGrouped = filteredTransactions.reduce((grouped, transaction) => {
      const date = new Date(transaction.attributes.transaction_time).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(transaction);
      return grouped;
    }, {});

    // 按日期排序
    const sortedGroupedTransactions = Object.keys(filteredAndGrouped)
      .sort((a, b) => new Date(b) - new Date(a)) // 降序排序
      .reduce((sorted, date) => {
        sorted[date] = filteredAndGrouped[date];
        return sorted;
      }, {});

    setGroupedTransactions(sortedGroupedTransactions);
  }, [transactions, searchQuery]);

  // Handle Menu (Edit/Delete)
  const handleMenuOpen = (event, transaction) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedTransaction(transaction);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTransaction(null);
    setMenuOpen(false);
  };

  const handleDelete = (transactionToDelete) => {
    const transaction = transactionToDelete || selectedTransaction;
    if (transaction) {
      const updatedGroupedTransactions = {...groupedTransactions};
      const date = new Date(transaction.attributes.transaction_time).toISOString().split("T")[0];

      updatedGroupedTransactions[date] = updatedGroupedTransactions[date].filter(
        (t) => t.id !== transaction.id
      );

      if (updatedGroupedTransactions[date].length === 0) {
        delete updatedGroupedTransactions[date];
      }

      setGroupedTransactions(updatedGroupedTransactions);
      setTransactions((prevTransactions) =>
        prevTransactions.filter((t) => t.id !== transaction.id)
      );
      handleMenuClose();
      setSwipedItemId(null);
    }
  };

  const handleTouchStart = (event, transaction) => {
    if (!isMobile) return;
    setTouchStart({
      x: event.touches[0].clientX,
      id: transaction.id
    });
    setTouchEnd(null);
  };

  const handleTouchMove = (event) => {
    if (!isMobile || !touchStart) return;
    setTouchEnd({
      x: event.touches[0].clientX
    });
  };

  const handleTouchEnd = (transaction) => {
    if (!isMobile || !touchStart || !touchEnd) {
      setTouchStart(null);
      setTouchEnd(null);
      return;
    }

    const distance = touchStart.x - touchEnd.x;
    const isSwipeLeft = distance > 100; // 滑动距离超过100px才触发

    if (isSwipeLeft) {
      setSwipedItemId(transaction.id);
      setTimeout(() => handleDelete(transaction), 300); // 等待动画完成后删除
    } else {
      setSwipedItemId(null);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleEdit = () => {
    if (selectedTransaction) {
      // console.log(selectedTransaction);
      console.log(`Edit transaction: ${selectedTransaction.attributes.shop.name}, id: ${selectedTransaction.id}`);
      setModalOpen(true); // 打开 DetailPageModal 模态框
      // navigate(`/transaction-management/edit/${selectedTransaction.id}`);
    }
    handleMenuClose();
  };

  // 处理列表项点击事件
  const handleListItemClick = (transaction) => {
    setSelectedTransaction(transaction);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTransaction(null);
  };

  const avatarMapping = {
    "Woolworths": "apple",
    "Countdown": "local_florist",
    "New World": "local_grocery_store",
    "Urban Threads": "devices",
    "Gadget Store": "apple",
    "TOMATO BASIL 185G": "local_florist",
    "TUNA": "food_bank",
  };

  return (
    <DashboardLayout>
      <DashboardNavbar/>
      <MDBox>

        {/*<MDAlert color="success" autoClose>*/}
        {/*  自动关闭的成功提示*/}
        {/*</MDAlert>*/}
        {/*<MDAlert*/}
        {/*  color="warning"*/}
        {/*  autoClose*/}
        {/*  autoCloseDelay={3000}*/}
        {/*>*/}
        {/*  3秒后关闭的警告*/}
        {/*</MDAlert>*/}

        {/* 搜索和新建按钮区域 */}
        <MDBox py={2}>
          <Card sx={{p: 2, mb: 2}}>
            <MDBox display="flex" justifyContent="space-between" alignItems="center">
              <TextField
                fullWidth
                placeholder="Search by name or type"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: <Icon sx={{mr: 1}}>search</Icon>,
                }}
              />

              <MDButton
                variant="gradient"
                color="info"
                sx={{ml: 2}}
                onClick={() => {
                  navigate("/transaction-management/new-transaction");
                }}>
                New
              </MDButton>
              <MDButton
                variant="gradient"
                color="primary"
                sx={{ml: 2}}
                onClick={() => setFilterModalOpen(true)}
              >
                Filter
              </MDButton>
            </MDBox>
          </Card>

          {/* 交易列表 */}
          <Card sx={{
            height: "calc(100vh - 180px)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            p: 3,
          }}>
            <List sx={{
              flexGrow: 1,
              overflowY: "auto",
            }}>
              {Object.entries(groupedTransactions).map(([date, transactions]) => (
                <MDBox key={date} mb={2}>
                  <MDTypography
                    variant="h4"
                    sx={{
                      mb: 1,
                      color: "text.primary",
                      fontWeight: "bold",
                    }}>
                    {date}
                  </MDTypography>

                  {/* 每条交易记录 */}
                  {transactions.map((transaction) => (
                    <ListItem
                      key={transaction.attributes.id}
                      divider
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        py: 2,
                        cursor: 'pointer',
                        transform: swipedItemId === transaction.id ? 'translateX(-100%)' : 'translateX(0)',
                        transition: 'transform 0.3s ease-out',
                        position: 'relative',
                        backgroundColor: 'white',
                      }}
                      onClick={() => handleListItemClick(transaction)}
                      onTouchStart={(e) => handleTouchStart(e, transaction)}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={() => handleTouchEnd(transaction)}
                    >

                      {/* 左侧：图标和文本 */}
                      <MDBox display="flex" alignItems="center" flex="1">
                        <ListItemAvatar>
                          <Avatar sx={{bgcolor: "primary.light"}}>
                            <Icon>{avatarMapping[transaction.attributes.shop.name] || "store"}</Icon>
                            {/* 如果没有找到商店名称的映射，就使用默认的"store"图标 */}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <MDTypography variant="body1" noWrap>
                              {transaction.attributes.shop.name}
                            </MDTypography>
                          }
                          secondary={
                            <MDTypography variant="caption1" color="textSecondary">
                              {transaction.attributes.shop.category}
                            </MDTypography>
                          }
                        />
                      </MDBox>

                      {/* 金额 */}
                      <MDTypography
                        variant="h4"
                        color="error"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        -${Math.abs(transaction.attributes.total_price).toFixed(2)}
                      </MDTypography>

                      {!isMobile && (
                        <Tooltip title="More actions" placement="top">
                          <IconButton onClick={(event) => handleMenuOpen(event, transaction)}>
                            <Icon>more_vert</Icon>
                          </IconButton>
                        </Tooltip>
                      )}
                    </ListItem>
                  ))}
                </MDBox>
              ))}
            </List>
          </Card>

          {/* 编辑/删除菜单 */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleEdit}>
              <Icon sx={{mr: 1}}>edit</Icon> Edit
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <Icon sx={{mr: 1}}>delete</Icon> Delete
            </MenuItem>
          </Menu>
        </MDBox>

        {/* Detail Modal */}

        <DetailPageModal
          open={modalOpen}
          onClose={handleCloseModal}
          transaction={selectedTransaction}
        />

        {/*<TransactionModal*/}
        {/*  open={modalOpen}*/}
        {/*  onClose={handleCloseModal}*/}
        {/*  transaction={selectedTransaction}*/}
        {/*   onEdit={handleEdit}*/}
        {/*/>*/}

      </MDBox>

      {/* Filter Modal */}
      <FilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        transactions={transactions}
        onFilter={setSelectedCategories}
      />

      {/*<Footer/>*/}
    </DashboardLayout>
  );
}

export default Home;
// ### 扩展建议
// 1. **动态分页支持**：将分页功能与后端 API 结合，实现大数据量的加载和展示。
// 2. **记录编辑**：弹窗表单实现支出记录的编辑功能。
// 3. **多条件筛选**：支持按日期范围、金额范围、类别等条件筛选记录。
// 4. **后端集成**：连接后端 API，动态获取和更新支出记录。
//
// 在检查 `index.js` 文件时，我发现了一些潜在的问题和不合理之处。以下是我对代码的分析和建议：
//
// ### 1. **重复的 `filteredTransactions` 计算**
// - 你在 `handleSearch` 函数中计算了 `filteredTransactions`，但在 `useEffect` 中又重复计算了一次。这会导致不必要的性能开销。
//    - **建议**：将 `filteredTransactions` 的计算逻辑统一放在 `useEffect` 中，避免重复计算。
//
// ### 2. **`handleDelete` 函数中的日期处理**
// - 在 `handleDelete` 函数中，你使用了 `selectedTransaction.attributes.date` 来获取日期，但在其他地方使用的是 `transaction.attributes.transaction_time`。这可能会导致不一致性。
//    - **建议**：确保所有地方都使用相同的字段来获取日期，避免潜在的逻辑错误。
//
// ### 3. **`handleEdit` 函数的实现**
// - `handleEdit` 函数目前只是打印了选中的交易记录，没有实际的编辑功能。
//    - **建议**：实现一个编辑表单或弹窗，允许用户修改交易记录，并将修改后的数据提交到后端。
//
// ### 4. **`avatarMapping` 的扩展性**
// - `avatarMapping` 是一个硬编码的对象，用于映射商店名称到图标。如果商店名称发生变化或新增商店，需要手动更新这个映射。
//    - **建议**：考虑将 `avatarMapping` 存储在数据库中，或者提供一个默认的图标，避免硬编码。
//
// ### 5. **`DetailPageModal` 和 `TransactionModal` 的冗余**
// - 代码中同时引入了 `DetailPageModal` 和 `TransactionModal`，但 `TransactionModal` 被注释掉了。这可能会导致混淆。
//    - **建议**：根据实际需求选择使用其中一个模态框，并删除不必要的代码。
//
// ### 6. **`handleOpenModal` 和 `handleCloseModal` 的冗余**
// - `handleOpenModal` 和 `handleCloseModal` 函数与 `DetailPageModal` 和 `TransactionModal` 相关，但它们的实现有些冗余。
//    - **建议**：将模态框的逻辑统一，避免重复代码。
//
// ### 7. **`navigate` 的使用**
// - 你在 `MDButton` 的 `onClick` 事件中使用了 `navigate` 函数来跳转到新建交易页面，但路径 `"/transaction-management/new-transaction"` 可能与实际路由不匹配。
//    - **建议**：确保路径与实际路由一致，避免跳转失败。
//
// ### 8. **`List` 组件的冗余**
// - 在 `MDBox` 中有一个冗余的 `List` 组件，它遍历了 `transactions` 并调用了 `handleOpenModal`，但这个 `List` 并没有实际展示在页面上。
//    - **建议**：删除这个冗余的 `List` 组件，避免不必要的渲染。
//
// ### 9. **`DetailPageModal` 的 `onDelete` 和 `onEdit` 处理**
// - `DetailPageModal` 组件被注释掉了 `onDelete` 和 `onEdit` 的处理逻辑，这可能会导致模态框的功能不完整。
//    - **建议**：确保 `DetailPageModal` 组件能够正确处理删除和编辑操作。
//
// ### 10. **代码注释**
// - 代码中有一些注释掉的代码块（如 `TransactionCard` 和 `TransactionModal`），这些代码可能会影响代码的可读性。
//    - **建议**：删除不必要的注释代码，保持代码的整洁。
//
// ### 11. **性能优化**
// - 在 `useEffect` 中，每次 `transactions` 或 `searchQuery` 变化时都会重新计算 `groupedTransactions`，这可能会导致性能问题，尤其是在数据量较大的情况下。
//    - **建议**：考虑使用 `useMemo` 来优化 `groupedTransactions` 的计算，避免不必要的重复计算。
//
// ### 12. **错误处理**
// - 在 `useEffect` 中获取交易数据时，没有处理可能的错误情况（如网络请求失败）。
//    - **建议**：添加错误处理逻辑，确保在请求失败时能够给用户适当的反馈。
//
// ### 总结
// 代码整体结构清晰，功能实现较为完整，但仍有一些可以优化的地方。通过上述建议，可以进一步提升代码的可维护性和性能。
