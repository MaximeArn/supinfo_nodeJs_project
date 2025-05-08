export default function validateBody(schema) {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ response: "Request body is missing" });
    }

    const { error: validationReturn } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (validationReturn) {
      const errors = validationReturn.details.map((error) => ({
        field: error.path[0],
        message: error.message,
      }));
      return res.status(400).json({ message: "Body validation error", errors });
    }

    next();
  };
}
