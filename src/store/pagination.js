export const callBackTool = (
  node,
  loading,
  observer,
  setPageNumber,
  users,
  totalUsers
) => {
  // if totalUsers number equals the length of the users object
  // it means that all of the avaliable data was already retrieved so
  // fetching process will stop
  if (loading !== "false" || users.length === totalUsers) return;
  if (observer.current) observer.current.disconnect();
  observer.current = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setPageNumber((prev) => prev + 1);
    }
  });
  if (node) observer.current.observe(node);
};
