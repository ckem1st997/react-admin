export const recursiveSearch = (items: any[], query: string) => {
    return items
      .map((item) => {
        let isMatch = false; // Biến để kiểm tra xem item hiện tại có khớp không
        if (item.items) {
          const matchingChildren = recursiveSearch(item.items, query);
          if (matchingChildren.length > 0) {
            // Nếu các con thỏa mãn điều kiện tìm kiếm, thì cả cha cũng thỏa mãn
            isMatch = true;
            item = { ...item, items: matchingChildren };
          }
        }
        if (item.label.includes(query) || item.name.includes(query) || item.id.includes(query)) {
          isMatch = true;
        }
        return isMatch ? item : null; // Trả về item nếu nó thỏa mãn điều kiện, ngược lại trả về null
      })
      .filter((item) => item !== null); // Lọc bỏ các item là null
  };