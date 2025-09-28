module.exports = {
  docs: [
    {
      type: "doc",
      id: "intro",
      label: "Introduction",
    },
    {
      type: "category",
      label: "Stage 1: Hosted Checkout",
      items: ["stage1/setup", "stage1/usage", "stage1/api"],
    },
    {
      type: "category",
      label: "Stage 2: Direct API Integration",
      items: [
        {
          type: "category",
          label: "Python",
          items: ["stage2/python"],
        },
        {
          type: "category",
          label: "Laravel",
          items: ["stage2/laravel"],
        },
        {
          type: "category",
          label: "C#",
          items: ["stage2/csharp"],
        },
        {
          type: "category",
          label: "Node.js",
          items: ["stage2/nodejs"],
        },
        "stage2/api",
      ],
    },
    {
      type: "category",
      label: "Stage 3: Static & Dynamic Payments",
      items: ["stage3/setup", "stage3/usage", "stage3/api"],
    },
    {
      type: "category",
      label: "General",
      items: ["general/security", "general/testing"],
    },
  ],
};
