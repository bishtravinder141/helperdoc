export const buildQueryFromSelectedFilters = (queryData) => {
    const queryParts = [];
  
    for (const key in queryData) {
      const value = queryData[key];
  
      if (Array.isArray(value)) {
        if (value.length > 0) {
          queryParts.push(value.map((item) => `${key}=${item}`).join("&"));
        }
      } else if (typeof value === "object") {
        const subQueryParts = [];
        for (const subKey in value) {
          const subValue = value[subKey];
          if (subValue !== "") {
            subQueryParts.push(`${subKey}=${subValue}`);
          }
        }
        if (subQueryParts.length > 0) {
          queryParts.push(subQueryParts.join("&"));
        }
      } else if (value !== "") {
        queryParts.push(`${key}=${value}`);
      }
    }
  
    return `${queryParts.join("&")}`;
  };