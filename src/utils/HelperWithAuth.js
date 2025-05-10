const withAuth = (currentUser, action, openPrompt) => {
  return async (...args) => {
    if (!currentUser) {
      openPrompt(); // Show auth prompt modal
      return;
    }
    return await action(...args); // Run the original action
  };
};

export default withAuth;



