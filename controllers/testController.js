// Example controller for test routes
export const getTest = async (req, res) => {
  // Simulate async operation, e.g., DB query
  const data = { message: "Test GET route works!" };
  res.json(data);
};

export const postTest = async (req, res) => {
  const body = req.body;
  // Simulate async DB save
  res.json({ message: "Data received successfully!", body });
};
