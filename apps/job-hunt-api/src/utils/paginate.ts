export const getPaginated = (query: any) => {
    let page;
    let limit;
    let offset;
  
    if (query.page && query.limit) {
      page = +query?.page || 1;
      limit = +query?.limit || 10;
      offset = limit * (page - 1);
    }
  
    return { limit, offset };
  };
  